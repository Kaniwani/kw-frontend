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
import stripTildes from 'utils/stripTildes';

import app from 'containers/App/actions';
import { selectPreviouslyIncorrect, selectCurrentId, makeSelectReview } from 'containers/App/selectors';
import quiz from './actions';
import { selectQuizAnswer, selectBackup } from './selectors';

const isInputValid = (input = '') => !isEmpty(input) && isJapanese(input);
const cleanseInput = (input = '') => fixTerminalN(input.trim());

function flattenAnswers({ synonyms, vocabulary: { readings } }) {
  return flatMap(readings, ({ character, kana }) => [character, ...kana])
    .concat(...synonyms)
    .map((text) => ({ original: text, cleaned: stripTildes(text) }));
}

function findMatch(input = '', review) {
  const cleanInput = stripTildes(input);
  return flattenAnswers(review)
    .reduce((result, { original, cleaned }) => cleaned === cleanInput ? original : false);
}

export const submitAnswerLogic = createLogic({
  type: quiz.answer.submit,
  latest: true,
  process({ getState, action: { payload } }, dispatch, done) {
    const { category, value, isMarked, isDisabled, isCorrect, isIncorrect } = payload;
    const state = getState();
    const currentId = selectCurrentId(state, { category });
    const review = makeSelectReview(currentId)(state, { category });
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
      dispatch(quiz.answer.check({ review, answerValue, previouslyIncorrect }));
    }

    if (isDisabled && isValid) {
      if (isCorrect) {
        dispatch(app[category].correct.add(currentId));
        dispatch(quiz.answer.record.request({ category, id: currentId, isCorrect, previouslyIncorrect }));
      } else if (isIncorrect && !previouslyIncorrect) {
        dispatch(app[category].incorrect.add(currentId));
        dispatch(quiz.answer.record.request({ category, id: currentId, isCorrect, previouslyIncorrect }));
      } else if (isIncorrect && previouslyIncorrect) {
        console.log('wrong, but already recorded first time');
      } else {
        console.log('mon dieu, c’est pas possible!'); // eslint-disable-line no-console
        // should never happen
        // log error to slack
      }
      done();
    }
  },
});


export const checkAnswerLogic = createLogic({
  type: quiz.answer.check,
  latest: true,
  process({ action: { payload: { review, answerValue, previouslyIncorrect } } }, dispatch, done) {
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
      dispatch(quiz.answer.correct({ review }));
    } else if (!matchedAnswer) {
      dispatch(quiz.answer.update({ ...updatedAnswer, isIncorrect: true }));
      if (previouslyIncorrect) {
        dispatch(quiz.answer.incorrect({ review }));
      }
    } else {
      console.log('mon dieu, c’est pas possible!'); // eslint-disable-line no-console
      // should never happen
      // log error to slack
    }
    done();
  },
});

export const incorrectAnswerLogic = createLogic({
  type: quiz.answer.incorrect,
  latest: true,
  transform() {},
  process({ action: { payload: { review } } }, dispatch, done) {
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
      isBurned: SRS_RANGES.FIVE.includes(streak),
      isReviewReady: true,
    };
    dispatch(app.review.update(updatedReview));
    done();
  },
});

export const correctAnswerLogic = createLogic({
  type: quiz.answer.correct,
  latest: true,
  transform() {},
  process({ action: { payload: { review } } }, dispatch, done) {
    const correct = increment(review.correct);
    const streak = increment(review.streak);
    const updatedReview = {
      ...review,
      correct,
      streak,
      isCritical: determineCriticality(correct, review.incorrect),
      isBurned: SRS_RANGES.FIVE.includes(streak),
      isReviewReady: false,
      lastReviewDate: new Date(),
    };
    dispatch(app.review.update(updatedReview));
    done();
  },
});

export const ignoreAnswerLogic = createLogic({
  type: quiz.answer.ignore,
  validate({ getState, action }, allow, reject) {
    const { isMarked, isDisabled, isCorrect, isIncorrect } = selectQuizAnswer(getState());
    if ((isMarked && isDisabled) && (isCorrect || isIncorrect)) {
      allow(action);
    } else {
      reject();
    }
  },
  process({ getState, action: { payload: { category } } }, dispatch, done) {
    dispatch(app.review.update(selectBackup(getState())));
    dispatch(app[category].current.return());
    dispatch(quiz.backup.reset());
    dispatch(quiz.answer.reset());
    done();
  },
});

export const recordAnswerLogic = createLogic({
  type: quiz.answer.record.request,
  processOptions: {
    failType: quiz.answer.record.failure,
  },

  process({ action: { payload: { category, ...rest } } }, dispatch, done) {
    dispatch(app[category].current.set());
    dispatch(quiz.backup.reset());
    dispatch(quiz.answer.reset());
    return recordReview(rest)
      .then(() => { done(); })
      .catch((err) => err);
  },
});

export default [
  submitAnswerLogic,
  ignoreAnswerLogic,
  checkAnswerLogic,
  incorrectAnswerLogic,
  correctAnswerLogic,
  recordAnswerLogic,
];
