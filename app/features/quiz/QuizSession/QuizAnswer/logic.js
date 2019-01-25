import { createLogic } from 'redux-logic';
import { isKana } from 'wanakana';
import { serializeReviewResponse } from 'common/serializers';
import { SRS_RANGES } from 'common/constants';
import { ANSWER_TYPES } from 'common/components/AddSynonym/AddSynonymForm';

import determineCriticality from 'common/utils/determineCriticality';

import { selectUserSettings } from 'features/user/selectors';
import { selectReviewById } from 'features/reviews/selectors';
import { selectVocabById } from 'features/vocab/selectors';
import { selectSynonymById } from 'features/synonyms/selectors';
import {
  selectCategory,
  selectIsReviewQuiz,
  selectIsLessonQuiz,
  selectIsFinalQuestion,
  selectWrapUp,
  selectCurrent,
  selectCurrentId,
  selectCurrentPreviouslyIncorrect,
} from 'features/quiz/QuizSession/selectors';

import { app } from 'common/actions';
import quiz from 'features/quiz/actions';
import review from 'features/reviews/actions';
import synonym from 'features/synonyms/actions';
import notify from 'features/notifications/actions';
import { selectAnswer, selectAnswerIgnored } from './selectors';
import { matchAnswer, increment, decrement, isInputValid, cleanseInput } from './utils';

// we set this in quiz.advance and hold onto for clearing in quiz.answer.record
let autoAdvance = {};
const pendingAnswers = new Set();

export const stopAutoAdvance = () => {
  if (autoAdvance.timeoutId != null) {
    clearTimeout(autoAdvance.timeoutId);
    autoAdvance.done();
    autoAdvance = {};
  }
};

export const submitAnswerLogic = createLogic({
  type: quiz.answer.submit,
  latest: true,
  process({ getState, action }, dispatch, done) {
    const { isDisabled } = selectAnswer(getState());
    const answerValue = cleanseInput(action.payload);
    const isValid = isInputValid(answerValue);

    dispatch(
      quiz.answer.update({
        value: answerValue,
        type: isKana(answerValue) ? ANSWER_TYPES.READING : ANSWER_TYPES.WORD,
      })
    );

    if (!isValid) {
      dispatch(quiz.answer.update({ isMarked: true, isValid: false }));
    }

    if (isValid && !isDisabled) {
      dispatch(quiz.answer.check());
    }
    if (isValid && isDisabled) {
      dispatch(quiz.answer.confirm());
    }
    done();
  },
});

export const confirmAnswerLogic = createLogic({
  type: quiz.answer.confirm,
  latest: true,
  validate({ getState, action }, allow, reject) {
    const { value, isValid, isDisabled, isIgnored } = selectAnswer(getState());
    if (value && isValid && isDisabled && !isIgnored) {
      allow(action);
    } else {
      reject();
    }
  },
  process(_, dispatch, done) {
    dispatch(quiz.answer.record.request());
    done();
  },
});

export const checkAnswerLogic = createLogic({
  type: quiz.answer.check,
  latest: true,
  process({ getState }, dispatch, done) {
    const { value } = selectAnswer(getState());
    const settings = selectUserSettings(getState());
    const currentId = selectCurrentId(getState());
    const isLessonQuiz = selectIsLessonQuiz(getState());
    let { vocab, synonyms } = selectReviewById(getState(), { id: currentId });
    vocab = vocab.map((id) => selectVocabById(getState(), { id }));
    synonyms = synonyms.map((id) => selectSynonymById(getState(), { id }));
    const matchedAnswer = matchAnswer(value, [vocab, synonyms]);
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
      const isOpen = settings.autoExpandAnswerOnSuccess && settings.autoAdvanceOnSuccessDelayMilliseconds > 0;

      dispatch(
        quiz.info.update({
          isDisabled: false,
          detailLevel: settings.infoDetailLevelOnSuccess,
          isOpen,
        })
      );
    }

    if (!matchedAnswer) {
      dispatch(quiz.answer.update({ ...updatedAnswer, isIncorrect: true }));
      dispatch(quiz.answer.incorrect());
      const isOpen = settings.autoExpandAnswerOnFailure;
      const detailLevel = isLessonQuiz ? 2 : settings.infoDetailLevelOnFailure;
      dispatch(
        quiz.info.update({
          isDisabled: false,
          detailLevel,
          isOpen,
        })
      );
    }

    done();
  },
});

export const correctAnswerLogic = createLogic({
  type: quiz.answer.correct,
  latest: true,
  process({ getState }, dispatch, done) {
    const settings = selectUserSettings(getState());
    const current = selectCurrent(getState());
    const previouslyIncorrect = selectCurrentPreviouslyIncorrect(getState());

    if (settings.autoAdvanceOnSuccess) {
      dispatch(quiz.question.advance());
    }

    const newCorrect = !previouslyIncorrect ? increment(current.correct) : current.correct;
    const newStreak = !previouslyIncorrect ? increment(current.streak) : current.streak;
    const updatedReview = {
      ...current,
      correct: newCorrect,
      streak: newStreak,
      critical: determineCriticality(newCorrect, current.incorrect),
    };

    dispatch(quiz.session.current.update(updatedReview));
    done();
  },
});

export const incorrectAnswerLogic = createLogic({
  type: quiz.answer.incorrect,
  latest: true,
  process(
    {
      getState,
      action: { payload = {} },
    },
    dispatch,
    done
  ) {
    const current = selectCurrent(getState());
    const isLessonQuiz = selectIsLessonQuiz(getState());
    const previouslyIncorrect = selectCurrentPreviouslyIncorrect(getState());
    let { streak: newStreak, incorrect: newIncorrect } = current;

    if (!isLessonQuiz && !previouslyIncorrect) {
      const isCloseToBurned = [...SRS_RANGES.THREE, ...SRS_RANGES.FOUR].includes(newStreak);

      newIncorrect = increment(newIncorrect);
      newStreak = isCloseToBurned
        ? decrement(current.streak - 1) // double decrement if close to burned
        : Math.max(decrement(current.streak), 1); // guard against dropping streak to "lesson" status
    }

    const updatedReview = {
      ...current,
      incorrect: newIncorrect,
      streak: newStreak,
      critical: determineCriticality(current.correct, newIncorrect),
    };

    dispatch(quiz.session.current.update(updatedReview));
    if (payload.forceIncorrect) {
      setTimeout(() => {
        dispatch(quiz.answer.record.request());
        done();
      }, 1000);
    } else {
      done();
    }
  },
});

export const ignoreAnswerLogic = createLogic({
  type: quiz.answer.ignore,
  validate({ getState, action }, allow, reject) {
    const isLessonQuiz = selectIsLessonQuiz(getState());
    if (isLessonQuiz) {
      reject();
    }
    const { isMarked, isDisabled, isCorrect, isIncorrect } = selectAnswer(getState());
    stopAutoAdvance();
    if (isMarked && isDisabled && (isCorrect || isIncorrect)) {
      allow(action);
    } else {
      reject();
    }
  },
  process({ getState }, dispatch, done) {
    const { isCorrect } = selectAnswer(getState());
    if (isCorrect) {
      dispatch(quiz.answer.update({ isCorrect: false, isIncorrect: true }));
      dispatch(quiz.answer.incorrect({ forceIncorrect: true }));
    } else {
      dispatch(quiz.answer.update({ isIgnored: true }));
      dispatch(quiz.question.advance());
    }
    done();
  },
});

export const disableReviewLogic = createLogic({
  type: review.lock.request,
  process(
    {
      history,
      getState,
      action: {
        payload: { id },
      },
    },
    dispatch,
    done
  ) {
    stopAutoAdvance();
    const isFinalQuestion = selectIsFinalQuestion(getState());
    const category = selectCategory(getState());
    dispatch(quiz.answer.update({ isIgnored: true }));

    if (isFinalQuestion) {
      dispatch(quiz.info.reset());
      dispatch(quiz.answer.reset());
      dispatch(quiz.session.queue.clear());
      dispatch(quiz.session.current.replace());
      setTimeout(() => {
        history.push(`/${category}`);
        done();
      }, 2000);
    } else {
      dispatch(quiz.session.addComplete(id));
      dispatch(quiz.session.queue.remove(id));
      setTimeout(() => {
        dispatch(quiz.info.reset());
        dispatch(quiz.answer.reset());
        dispatch(quiz.session.current.replace());
        done();
      }, 1000);
    }
  },
});

export const recordAnswerLogic = createLogic({
  type: quiz.answer.record.request,
  process({ api, history, getState }, dispatch, done) {
    const category = selectCategory(getState());
    const current = selectCurrent(getState());
    const wrapUp = selectWrapUp(getState());
    const isLessonQuiz = selectIsLessonQuiz(getState());
    const isFinalQuestion = selectIsFinalQuestion(getState());
    const { isCorrect } = selectAnswer(getState());
    const previouslyIncorrect = selectCurrentPreviouslyIncorrect(getState());
    stopAutoAdvance();

    // only add to correct/incorrect totals on first attempt
    if (!previouslyIncorrect) {
      const action = isCorrect ? 'addCorrect' : 'addIncorrect';
      dispatch(quiz.session[action](current.id));
      dispatch(quiz.summary[action](current.id, { category }));
    }

    if (isCorrect) {
      dispatch(quiz.session.addComplete(current.id));
      if (wrapUp.active) {
        dispatch(quiz.session.wrapUp.decrement());
      }
      if (isFinalQuestion) {
        dispatch(quiz.session.queue.clear());
        setTimeout(() => history.push(`/${category}`), 1000);
      }
      dispatch(quiz.session.current.replace());
    } else {
      dispatch(quiz.session.current.rotate());
    }

    dispatch(quiz.answer.reset());
    dispatch(quiz.info.reset());

    if (isLessonQuiz && !isCorrect) {
      dispatch(review.update(current));
      done();
    } else {
      // TODO: early exit if answer already pending?
      // NOTE: added this check for logging to Sentry with that annoying 403 error below
      const wasAlreadyPending = pendingAnswers.has(current.id);
      pendingAnswers.add(current.id);

      if (pendingAnswers.size >= 3) {
        dispatch(
          notify.warning({
            content:
              'You have several answer submissions still pending. You might be experiencing connection problems.',
            duration: 8000,
          })
        );
      }

      const decorateResubmitError = (err) => {
        /* eslint-disable no-param-reassign */
        if (
          err.status === 403
          && err.json
          && err.json.detail
          && err.json.detail.includes('need to be reviewed')
        ) {
          err.message = 'Resubmit error';
          err.originalMessage = JSON.stringify(err.message);
          err.description = JSON.stringify(err.description);
        }
        /* eslint-enable no-param-reassign */
        return err;
      };

      api.quiz
        .record({ id: current.id, isCorrect, previouslyIncorrect })
        .then((response) => {
          pendingAnswers.delete(current.id);
          const { vocabById, synonymsById, ...updatedReview } = serializeReviewResponse(response);
          dispatch(quiz.answer.record.success(current.id));
          dispatch(review.update(updatedReview));
          if (isCorrect) {
            dispatch(quiz.session.queue.load.request());
          }
          done();
        })
        .catch((err) => {
          dispatch(
            app.captureError(decorateResubmitError(err), {
              current,
              isCorrect,
              previouslyIncorrect,
              wasAlreadyPending,
              pendingAnswers: [...pendingAnswers],
            })
          );
          dispatch(quiz.answer.record.failure(err));
          done();
        });
    }
  },
});

export const autoAdvanceLogic = createLogic({
  type: quiz.question.advance,
  warnTimeout: 11000,
  process({ getState }, dispatch, done) {
    const { autoAdvanceOnSuccessDelayMilliseconds } = selectUserSettings(getState());
    const answerIgnored = selectAnswerIgnored(getState());

    if (answerIgnored) {
      const isReviewQuiz = selectIsReviewQuiz(getState());
      const reviewsQuizDelay = 700;
      const lessonsQuizDelay = 200;
      const msDelay = isReviewQuiz ? reviewsQuizDelay : lessonsQuizDelay;
      // allow time for "ignored" animation to occur in _reviews quiz_
      setTimeout(() => {
        dispatch(quiz.answer.reset());
        dispatch(quiz.info.reset());
        dispatch(quiz.session.current.rotate());
        done();
      }, msDelay);
    } else {
      const timeoutId = setTimeout(() => {
        dispatch(quiz.answer.confirm());
        done();
      }, autoAdvanceOnSuccessDelayMilliseconds);

      autoAdvance = {
        timeoutId,
        done,
      };
    }
  },
});

export const synonymAddLogic = createLogic({
  type: synonym.add.success,
  process({ getState }, dispatch, done) {
    dispatch(quiz.session.setSynonymModal(false));
    const { isIncorrect } = selectAnswer(getState());
    if (isIncorrect) {
      dispatch(quiz.answer.ignore());
    }
    done();
  },
});

export default [
  submitAnswerLogic,
  confirmAnswerLogic,
  checkAnswerLogic,
  ignoreAnswerLogic,
  disableReviewLogic,
  incorrectAnswerLogic,
  correctAnswerLogic,
  recordAnswerLogic,
  autoAdvanceLogic,
  synonymAddLogic,
];
