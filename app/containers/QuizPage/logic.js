import { createLogic } from 'redux-logic';
import { isJapanese, isKana } from 'wanakana';
import isEmpty from 'lodash/isEmpty';
import flatMap from 'lodash/flatMap';

import { recordReview } from 'shared/api';
import { SRS_RANGES } from 'shared/constants';
import fixTerminalN from 'utils/fixTerminalN';
import increment from 'utils/increment';
import decrement from 'utils/decrement';
import determineCriticality from 'utils/determineCriticality';
import stripTilde from 'utils/stripTilde';

import app from 'containers/App/actions';
import {
  selectPreviouslyIncorrect,
  selectCurrentId,
  selectQuizSettings,
  selectQueue,
  selectRemainingCount,
  makeSelectReview,
  makeSelectReviewNotes,
} from 'containers/App/selectors';

import quiz from './actions';
import { selectQuizAnswer, selectBackup } from './selectors';

// set in quiz.advance and hold onto for clearing in quiz.answer.record
let autoAdvanceTimeout;

const isInputValid = (input = '') => !isEmpty(input) && isJapanese(input);
const cleanseInput = (input = '') => fixTerminalN(input.trim());

function flattenAnswers({ synonyms, vocabulary: { readings } }) {
  return flatMap(
    [...readings, ...synonyms],
    ({ character, kana }) => [character, ...kana]
  ).map((text) => ({ originalText: text, cleanAnswer: stripTilde(text) }));
}

function findMatch(input = '', review) {
  const cleanInput = stripTilde(input);
  const match = flattenAnswers(review).find(({ cleanAnswer }) => cleanAnswer === cleanInput);
  return match ? match.originalText : '';
}

export const submitAnswerLogic = createLogic({
  type: quiz.answer.submit,
  latest: true,
  process({ getState, action: { payload: { category } } }, dispatch, done) {
    const state = getState();
    const { value, isMarked, isDisabled, isCorrect, isIncorrect } = selectQuizAnswer(state);
    const id = selectCurrentId(state, { category });
    const review = makeSelectReview(id)(state, { category });
    const previouslyIncorrect = selectPreviouslyIncorrect(state, { category });
    const answerValue = cleanseInput(value);
    const isValid = isInputValid(answerValue);

    if (!isMarked) {
      // hold onto unmodified review for ignoring answers
      dispatch(quiz.backup.set(review));
    }

    if (!isValid) {
      dispatch(quiz.answer.update({ isMarked: true, isValid: false }));
    }

    if (!isDisabled && isValid) {
      dispatch(quiz.answer.check({ category, review, answerValue, previouslyIncorrect }));
    }

    if (isDisabled && isValid) {
      if (isIncorrect) {
        dispatch(quiz.answer.incorrect({ review }));
      }
      dispatch(quiz.answer.record.request({ category, id, isCorrect, isIncorrect, previouslyIncorrect }));
    }

    done();
  },
});

export const checkAnswerLogic = createLogic({
  type: quiz.answer.check,
  latest: true,
  process({ getState, action: { payload: { category, review, answerValue, previouslyIncorrect } } }, dispatch, done) {
    const { autoAdvance, autoExpandCorrect, autoExpandIncorrect } = selectQuizSettings(getState());
    const matchedAnswer = findMatch(answerValue, review);
    const type = isKana(answerValue) ? 'kana' : 'kanji';
    const updatedAnswer = {
      type,
      value: answerValue,
      focus: false,
      isMarked: true,
      isValid: true,
      isDisabled: true,
      isCorrect: false,
      isIncorrect: false,
    };

    if (matchedAnswer) {
      dispatch(quiz.answer.update({ ...updatedAnswer, value: matchedAnswer, isCorrect: true }));
      dispatch(quiz.answer.correct({ review, category }));
      dispatch(quiz.info.update({ isDisabled: false, detailLevel: 1 }));

      if (autoExpandCorrect && autoAdvance.speed > 0) {
        dispatch(quiz.info.update({ activePanel: 'INFO' }));
      }
    }

    if (!matchedAnswer) {
      dispatch(quiz.answer.update({ ...updatedAnswer, isIncorrect: true }));
      dispatch(quiz.info.update({ isDisabled: false, detailLevel: 0 }));
      if (autoExpandIncorrect) {
        dispatch(quiz.info.update({ activePanel: 'INFO' }));
      }
      if (previouslyIncorrect) {
        dispatch(quiz.answer.incorrect({ review }));
      }
    }

    done();
  },
});

export const incorrectAnswerLogic = createLogic({
  type: quiz.answer.incorrect,
  latest: true,
  transform({ action: { type, payload: { review } } }, next) {
    const incorrect = increment(review.incorrect);
    // double decrement if close to burned
    const streak = [...SRS_RANGES.THREE, ...SRS_RANGES.FOUR].includes(streak) ?
      decrement(review.streak - 1) :
      decrement(review.streak);
    const updatedReview = {
      ...review,
      incorrect,
      streak,
      isCritical: determineCriticality(review.correct, incorrect),
    };
    next({ type, payload: updatedReview });
  },
  process({ action: { payload } }, dispatch, done) {
    dispatch(app.review.update(payload));
    done();
  },
});

export const correctAnswerLogic = createLogic({
  type: quiz.answer.correct,
  latest: true,
  process({ getState, action: { payload: { review, category } } }, dispatch, done) {
    const { autoAdvance } = selectQuizSettings(getState());
    if (autoAdvance.active) {
      dispatch(quiz.advance({ category, autoAdvance }));
    }
    const correct = increment(review.correct);
    const streak = increment(review.streak);
    const updatedReview = {
      ...review,
      correct,
      streak,
      isCritical: determineCriticality(correct, review.incorrect),
    };
    dispatch(app.review.update(updatedReview));
    done();
  },
});

export const ignoreAnswerLogic = createLogic({
  type: quiz.answer.ignore,
  validate({ getState, action }, allow, reject) {
    clearTimeout(autoAdvanceTimeout);
    const { isMarked, isDisabled, isCorrect, isIncorrect } = selectQuizAnswer(getState());
    if ((isMarked && isDisabled) && (isCorrect || isIncorrect)) {
      allow(action);
    } else {
      reject();
    }
  },
  process({ getState, action: { payload: { category } } }, dispatch, done) {
    const backup = selectBackup(getState());
    // in case user edited notes in quiz info
    const notes = makeSelectReviewNotes(backup.id)(getState());
    dispatch(app.review.update(Object.assign({}, backup, { notes })));

    dispatch(quiz.answer.update({ isIgnored: true }));
    dispatch(quiz.info.reset());
    // allow animation to occur
    setTimeout(() => {
      dispatch(app[category].current.return());
      dispatch(quiz.backup.reset());
      dispatch(quiz.answer.reset());
      done();
    }, 600);
  },
});

export const recordAnswerLogic = createLogic({
  type: quiz.answer.record.request,
  process({ action: { payload: { category, id, isCorrect, previouslyIncorrect } } }, dispatch, done) {
    clearTimeout(autoAdvanceTimeout);
    dispatch(app[category][isCorrect ? 'correct' : 'incorrect'].add(id));
    dispatch(app[category].current.set());
    dispatch(quiz.answer.reset());
    dispatch(quiz.backup.reset());
    dispatch(quiz.info.reset());

    recordReview({ id, isCorrect, previouslyIncorrect })
      .then(() => dispatch(quiz.answer.record.success({ isCorrect, category })))
      .catch((err) => dispatch(quiz.answer.record.failure(err)));
    done();
  },
});

export const loadMoreQueueLogic = createLogic({
  type: quiz.answer.record.success,
  process({ getState, action: { payload: { isCorrect, category } } }, dispatch, done) {
    if (isCorrect) {
      const state = getState();
      const queue = selectQueue(state, { category });
      const remainingCount = selectRemainingCount(state, { category });
      const moreQueueNeeded = queue.length < 15 && remainingCount > (queue.length + 1 /* current question */);
      if (moreQueueNeeded) {
        dispatch(app[category].queue.load.request());
      }
    }
    done();
  },
});

export const autoAdvanceLogic = createLogic({
  type: quiz.advance,
  process({ action: { payload: { autoAdvance, category } } }, dispatch, done) {
    autoAdvanceTimeout = setTimeout(() => {
      dispatch(quiz.answer.submit({ category }));
      done();
    }, autoAdvance.speed);
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
  loadMoreQueueLogic,
];
