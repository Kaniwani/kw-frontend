import { createLogic } from 'redux-logic';
import { isKana } from 'wanakana';

import { SRS_RANGES } from 'common/constants';

import determineCriticality from 'common/utils/determineCriticality';
import {
  matchAnswer,
  combineAnswers,
  increment,
  decrement,
  isInputValid,
  cleanseInput,
} from './utils';

import { selectQuizSettings } from 'features/user/selectors';
import { selectVocabById } from 'features/vocab/selectors';
import { selectSynonymById } from 'features/synonyms/selectors';

import {
  selectCategory,
  selectIsReviewQuiz,
  selectIsLessonQuiz,
  selectCurrent,
  selectPreviouslyIncorrect,
  // selectQueueNeeded,
} from 'features/quiz/QuizSession/selectors';

import quiz from 'features/quiz/actions';
import { selectQuizAnswer } from './selectors';

// we set this in quiz.advance and hold onto for clearing in quiz.answer.record
let autoAdvanceTimeout;

export const submitAnswerLogic = createLogic({
  type: quiz.answer.submit,
  // answer input is debounced by 200, ensure state has been updated first
  debounce: 200,
  latest: true,
  process({ getState }, dispatch, done) {
    const { value, isDisabled, isIncorrect } = selectQuizAnswer(getState());
    const answerValue = cleanseInput(value);
    const isValid = isInputValid(answerValue);

    dispatch(
      quiz.answer.update({
        value: answerValue,
        type: isKana(answerValue) ? 'kana' : 'kanji',
      })
    );

    if (!isValid) {
      dispatch(quiz.answer.update({ isMarked: true, isValid: false }));
    }

    if (!isDisabled && isValid) {
      dispatch(quiz.answer.check());
    }

    if (isDisabled && isValid) {
      if (isIncorrect) {
        dispatch(quiz.answer.incorrect());
      }
      dispatch(quiz.answer.record.request());
    }

    done();
  },
});

export const checkAnswerLogic = createLogic({
  type: quiz.answer.check,
  latest: true,
  process({ getState }, dispatch, done) {
    const { value } = selectQuizAnswer(getState());
    const previouslyIncorrect = selectPreviouslyIncorrect(getState());
    const settings = selectQuizSettings(getState());
    let { vocab, synonyms } = selectCurrent(getState());
    vocab = vocab.map((id) => selectVocabById(getState(), { id }));
    synonyms = synonyms.map((id) => selectSynonymById(getState(), { id }));
    const isLessonQuiz = selectIsLessonQuiz(getState());
    const matchedAnswer = matchAnswer(value, combineAnswers(vocab, synonyms));
    const updatedAnswer = {
      isFocused: false,
      isMarked: true,
      isValid: true,
      isDisabled: true,
      isCorrect: false,
      isIncorrect: false,
    };

    if (matchedAnswer) {
      dispatch(
        quiz.answer.update({
          ...updatedAnswer,
          value: matchedAnswer,
          isCorrect: true,
        })
      );
      dispatch(quiz.answer.correct());
      dispatch(quiz.info.update({ isDisabled: false, detailLevel: 1 }));

      if (
        settings.autoExpandAnswerOnSuccess &&
        settings.autoAdvanceOnSuccessDelayMilliseconds > 0
      ) {
        dispatch(quiz.info.update({ activePanel: 'INFO' }));
      }
    }

    if (!matchedAnswer) {
      dispatch(quiz.answer.update({ ...updatedAnswer, isIncorrect: true }));
      dispatch(quiz.info.update({ isDisabled: false, detailLevel: 0 }));
      if (settings.autoExpandAnswerOnFailure) {
        dispatch(quiz.info.update({ activePanel: 'INFO' }));
      }
      // lesson quiz has no incorrect penalties
      if (previouslyIncorrect && !isLessonQuiz) {
        dispatch(quiz.answer.incorrect());
      }
    }

    done();
  },
});

export const correctAnswerLogic = createLogic({
  type: quiz.answer.correct,
  latest: true,
  process({ getState }, dispatch, done) {
    const settings = selectQuizSettings(getState());
    const current = selectCurrent(getState());
    const previouslyIncorrect = selectPreviouslyIncorrect(getState());

    if (settings.autoAdvanceOnSuccess) {
      dispatch(quiz.question.advance());
    }

    const correct = !previouslyIncorrect ? increment(current.correct) : current.correct;
    const streak = !previouslyIncorrect ? increment(current.streak) : current.streak;
    const updatedReview = {
      ...current,
      correct,
      streak,
      critical: determineCriticality(correct, current.incorrect),
    };

    dispatch(quiz.session.current.update(updatedReview));
    done();
  },
});

export const incorrectAnswerLogic = createLogic({
  type: quiz.answer.incorrect,
  latest: true,
  process({ getState }, dispatch, done) {
    const current = selectCurrent(getState());
    const previouslyIncorrect = selectPreviouslyIncorrect(getState());
    const incorrect = increment(current.incorrect);
    let { streak: newStreak } = current;
    const isCloseToBurned = [...SRS_RANGES.THREE, ...SRS_RANGES.FOUR].includes(newStreak);

    if (!previouslyIncorrect) {
      newStreak = isCloseToBurned
        ? decrement(current.streak - 1) // double decrement if close to burned
        : Math.max(decrement(current.streak), 1); // guard against dropping streak to "lesson" status
    }

    const updatedReview = {
      ...current,
      incorrect,
      streak: newStreak,
      critical: determineCriticality(current.correct, incorrect),
    };

    dispatch(quiz.session.current.update(updatedReview));
    done();
  },
});

export const ignoreAnswerLogic = createLogic({
  type: quiz.answer.ignore,
  validate({ getState, action }, allow, reject) {
    const { isMarked, isDisabled, isCorrect, isIncorrect } = selectQuizAnswer(getState());

    clearTimeout(autoAdvanceTimeout);

    if (isMarked && isDisabled && (isCorrect || isIncorrect)) {
      allow(action);
    } else {
      reject();
    }
  },
  process({ getState }, dispatch, done) {
    const isReviewQuiz = selectIsReviewQuiz(getState());
    dispatch(quiz.info.reset());
    // allow time for "ignored" animation to occur in _reviews quiz_
    const reviewsQuizDelay = 700;
    const lessonsQuizDelay = 200;
    const msDelay = isReviewQuiz ? reviewsQuizDelay : lessonsQuizDelay;
    setTimeout(() => {
      dispatch(quiz.session.current.return());
      dispatch(quiz.answer.reset());
      done();
    }, msDelay);
  },
});

export const recordAnswerLogic = createLogic({
  type: quiz.answer.record.request,
  process({ api, getState }, dispatch, done) {
    const { id } = selectCurrent(getState());
    const category = selectCategory(getState());
    const { isCorrect } = selectQuizAnswer(getState());
    const previouslyIncorrect = selectPreviouslyIncorrect(getState());
    clearTimeout(autoAdvanceTimeout);

    // only add to totals if not already present
    if (!previouslyIncorrect) {
      const bucket = isCorrect ? 'correct' : 'incorrect';
      dispatch(quiz.session[bucket].add(id));
      dispatch(quiz.summary[bucket].add(id, { category }));
    }

    dispatch(quiz.session.current.set());
    dispatch(quiz.answer.reset());
    dispatch(quiz.info.reset());
    api.quiz
      .record({ id, isCorrect, previouslyIncorrect })
      .then(() => {
        // TODO: what does reducer do here, is it still relevant?
        dispatch(quiz.answer.record.success({ isCorrect, category }));
        done();
      })
      .catch((err) => {
        dispatch(quiz.answer.record.failure(err));
        done();
      });
  },
});

export const loadQueueLogic = createLogic({
  type: quiz.answer.record.success,
  process({ getState }, dispatch, done) {
    const { isCorrect } = selectQuizAnswer(getState());

    const isQueueNeeded = false; // FIXME: temporary!
    if (isCorrect && isQueueNeeded) {
      dispatch(quiz.session.queue.load.request());
      done();
    }
    done();
  },
});

export const autoAdvanceLogic = createLogic({
  type: quiz.question.advance,
  process({ getState }, dispatch, done) {
    const { autoAdvanceOnSuccessDelayMilliseconds } = selectQuizSettings(getState());
    autoAdvanceTimeout = setTimeout(() => {
      dispatch(quiz.answer.submit());
      done();
    }, autoAdvanceOnSuccessDelayMilliseconds);
  },
});

export default [
  submitAnswerLogic,
  ignoreAnswerLogic,
  checkAnswerLogic,
  incorrectAnswerLogic,
  correctAnswerLogic,
  recordAnswerLogic,
  autoAdvanceLogic,
  loadQueueLogic,
];
