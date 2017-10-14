import { createLogic } from 'redux-logic';
import { isJapanese, isKana } from 'wanakana';
import { isEmpty, flatMap, sample, difference } from 'lodash';

import { recordReview } from 'shared/api';
import { SRS_RANGES } from 'shared/constants';
import fixTerminalN from 'utils/fixTerminalN';
import increment from 'utils/increment';
import decrement from 'utils/decrement';
import determineCriticality from 'utils/determineCriticality';
import stripTilde from 'utils/stripTilde';

import app from 'components/App/actions';
import {
  selectPreviouslyIncorrect,
  selectQuizSettings,
  selectQueue,
  selectRemainingCount,
  selectCurrent,
  selectCurrentId,
  selectSessionCorrectIds,
  selectReviewEntities,
} from 'components/App/selectors';

import quiz from './actions';
import { selectQuizAnswer } from './selectors';

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

export const setCurrentLogic = createLogic({
  type: [app.reviews.current.set, app.lessons.current.set],
  validate({ getState, action }, allow, reject) {
    const state = getState();
    const category = action.type === `${app.reviews.current.set}` ? 'reviews' : 'lessons';
    const current = selectCurrent(state);
    const queue = selectQueue(state, { category });
    const correct = selectSessionCorrectIds(state);
    const newId = sample(difference(queue, [current.id]));
    if (newId || queue.length) {
      const newCurrent = selectReviewEntities(state)[newId];
      allow({ ...action, payload: newCurrent });
    }
    if (!newId && current.id && !correct.includes(current.id)) {
      console.log('Current was the only remaining item', { queue, current, newId });
      allow({ ...action, payload: current });
    }
    if (!newId) {
      console.log('End of queue?');
      allow({ ...action, payload: { id: undefined } });
    }
    reject();
  },
});

export const returnCurrentLogic = createLogic({
  type: [app.reviews.current.return, app.lessons.current.return],
  validate({ getState, action }, allow, reject) {
    const state = getState();
    const category = action.type === `${app.reviews.current.return}` ? 'reviews' : 'lessons';
    const currentId = selectCurrentId(state);
    const queue = selectQueue(state, { category });
    const newId = sample(difference(queue, [currentId]));
    if (newId) {
      const newCurrent = selectReviewEntities(state)[newId];
      allow({ ...action, payload: { newCurrent, currentId } });
    } else {
      console.log('Rejected returning current - no other queue items', { queue, currentId, newId });
      reject();
    }
  },
});

export const submitAnswerLogic = createLogic({
  type: quiz.answer.submit,
  latest: true,
  process({ getState, action: { payload: { category } } }, dispatch, done) {
    const state = getState();
    const { value, isDisabled, isCorrect, isIncorrect } = selectQuizAnswer(state);
    const current = selectCurrent(state);
    const previouslyIncorrect = selectPreviouslyIncorrect(state, { category });
    const answerValue = cleanseInput(value);
    const isValid = isInputValid(answerValue);

    if (!isValid) {
      dispatch(quiz.answer.update({ isMarked: true, isValid: false }));
    }

    if (!isDisabled && isValid) {
      dispatch(quiz.answer.check({ category, current, answerValue, previouslyIncorrect }));
    }

    if (isDisabled && isValid) {
      if (isIncorrect) {
        dispatch(quiz.answer.incorrect({ category, current, previouslyIncorrect }));
      }
      dispatch(quiz.answer.record.request({ category, current, isCorrect, isIncorrect, previouslyIncorrect }));
    }

    done();
  },
});

export const checkAnswerLogic = createLogic({
  type: quiz.answer.check,
  latest: true,
  process({ getState, action: { payload: { category, current, answerValue, previouslyIncorrect } } }, dispatch, done) {
    const { autoAdvance, autoExpandCorrect, autoExpandIncorrect } = selectQuizSettings(getState());
    const matchedAnswer = findMatch(answerValue, current);
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
      dispatch(quiz.answer.correct({ current, category }));
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
        dispatch(quiz.answer.incorrect({ category, current }));
      }
    }

    done();
  },
});

export const incorrectAnswerLogic = createLogic({
  type: quiz.answer.incorrect,
  latest: true,
  process({ action: { payload: { category, current, previouslyIncorrect } } }, dispatch, done) {
    const incorrect = increment(current.incorrect);
    let streak;
    // only decrement if first time incorrect in session
    if (!previouslyIncorrect) {
      streak = [...SRS_RANGES.THREE, ...SRS_RANGES.FOUR].includes(streak) ?
        decrement(current.streak - 1) : // double decrement if close to burned
        Math.max(decrement(current.streak), 1); // disallow dropping to "lesson" status
    }

    const updatedReview = {
      ...current,
      incorrect,
      streak,
      isCritical: determineCriticality(current.correct, incorrect),
    };

    dispatch(app[category].current.update(updatedReview));
    done();
  },
});

export const correctAnswerLogic = createLogic({
  type: quiz.answer.correct,
  latest: true,
  process({ getState, action: { payload: { current, category } } }, dispatch, done) {
    const { autoAdvance } = selectQuizSettings(getState());
    if (autoAdvance.active) {
      dispatch(quiz.advance({ category, autoAdvance }));
    }
    const correct = increment(current.correct);
    const streak = increment(current.streak);
    const updatedReview = {
      ...current,
      correct,
      streak,
      isCritical: determineCriticality(correct, current.incorrect),
    };
    dispatch(app[category].current.update(updatedReview));
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
  process({ action: { payload: { category } } }, dispatch, done) {
    dispatch(quiz.answer.update({ isIgnored: true }));
    dispatch(quiz.info.reset());
    // allow animation to occur
    setTimeout(() => {
      dispatch(app[category].current.return());
      dispatch(quiz.answer.reset());
      done();
    }, 700);
  },
});

export const recordAnswerLogic = createLogic({
  type: quiz.answer.record.request,
  process({ action: { payload: { category, current, isCorrect, previouslyIncorrect } } }, dispatch, done) {
    const { id } = current;
    clearTimeout(autoAdvanceTimeout);
    dispatch(app.review.update(current));
    // prevent appearance in both correct and incorrect
    if (!previouslyIncorrect) {
      dispatch(app[category][isCorrect ? 'correct' : 'incorrect'].add(id));
    }
    dispatch(app[category].current.set());
    dispatch(quiz.answer.reset());
    dispatch(quiz.info.reset());

    recordReview({ id, isCorrect, previouslyIncorrect })
      .then(() => {
        dispatch(quiz.answer.record.success({ isCorrect, category }));
        done();
      })
      .catch((err) => {
        dispatch(quiz.answer.record.failure(err));
        done();
      });
  },
});

export const loadMoreQueueLogic = createLogic({
  type: quiz.answer.record.success,
  process({ getState, action: { payload: { isCorrect, category } } }, dispatch, done) {
    if (isCorrect) {
      const state = getState();
      const queue = selectQueue(state, { category });
      const remainingCount = selectRemainingCount(state, { category });
      const moreQueueNeeded = queue.length < 10 && remainingCount > (queue.length + 1 /* current */);
      console.log({ queueLength: queue.length, remainingCount, moreQueueNeeded });
      if (moreQueueNeeded) {
        dispatch(app[category].queue.load.request());
        done();
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
  setCurrentLogic,
  returnCurrentLogic,
  submitAnswerLogic,
  ignoreAnswerLogic,
  checkAnswerLogic,
  incorrectAnswerLogic,
  correctAnswerLogic,
  recordAnswerLogic,
  autoAdvanceLogic,
  loadMoreQueueLogic,
];
