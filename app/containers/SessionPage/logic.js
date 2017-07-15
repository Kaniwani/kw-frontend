import { createLogic } from 'redux-logic';
import { recordReview } from 'shared/api';
import { isJapanese, isKana } from 'wanakana';
import fixTerminalN from 'utils/fixTerminalN';
import isEmpty from 'lodash/isEmpty';
import flatMap from 'lodash/flatMap';
import increment from 'utils/increment';
import decrement from 'utils/decrement';
import stripTildes from 'utils/stripTildes';

import app from 'containers/App/actions';
import { selectIncorrectIds } from 'containers/App/selectors';
import quiz from './actions';
import { selectQuizAnswer } from './selectors';


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
    .reduce((result, { original, cleaned }) => cleaned === cleanInput ? original : null);
}

// hold onto unmodified review for ignoring answers
let pristineReview;

export const quizAnswerSubmitLogic = createLogic({
  type: quiz.answer.submit,
  latest: true,

  process({ getState, action: { payload, meta } }, dispatch, done) {
    const { value, isMarked, isCorrect, isIncorrect } = selectQuizAnswer(getState());
    const { currentId, review, category } = meta;

    const answerValue = cleanseInput(value);
    const isValid = isInputValid(answerValue);
    const isChecked = isCorrect || isIncorrect;
    if (!isMarked) {
      console.log('not marked');
      pristineReview = review;
    }
    if (!isValid) {
      console.log('invalid');
      dispatch(quiz.answer.update({ isMarked: true, isValid: false }));
    }
    if (!isChecked && isValid) {
      console.log('valid');
      const match = findMatch(answerValue, review);
      const type = isKana(answerValue) ? 'kana' : 'kanji';
      const updatedAnswer = {
        type,
        value: answerValue,
        isMarked: true,
        isValid: true,
        isDisabled: true,
        isCorrect: false,
        isIncorrect: false,
      };
      if (match == null) {
        console.log('no match');
        dispatch(quiz.answer.update({ ...updatedAnswer, isIncorrect: true }));
        dispatch(app.review.update({ ...review, incorrect: increment(review.incorrect), streak: decrement(review.streak) }));
        dispatch(app[category].incorrect.add(currentId));
      } else {
        console.log('match');
        dispatch(quiz.answer.update({ ...updatedAnswer, value: match, isCorrect: true }));
        dispatch(app.review.update({ ...review, correct: increment(review.correct), streak: increment(review.streak) }));
        dispatch(app[category].correct.add(currentId));
      }
    }
    if (isChecked && isValid) {
      console.log('already checked and valid');
      if (isCorrect || isIncorrect) {
        console.log({ isCorrect, isIncorrect });
        dispatch(quiz.answer.record.request({ id: currentId, isCorrect, isIncorrect }, { category }));
      } else {
        console.log('mon dieu, c’est pas possible!');
        // log error to slack
      }
    }
    done();
  },
});

export const quizAnswerIgnoreLogic = createLogic({
  type: quiz.answer.ignore,
  validate({ getState, action }, allow, reject) {
    const { isMarked, isCorrect, isIncorrect } = selectQuizAnswer(getState());
    if (isMarked && (isCorrect || isIncorrect)) {
      allow({ ...action, meta: { ...action.meta, isCorrect } });
    } else {
      reject();
    }
  },
  process({ getState, action: { meta: { category, currentId, isCorrect } } }, dispatch, done) {
    dispatch(app.review.update(pristineReview));
    dispatch(app[category].current.return());
    dispatch(app[category][isCorrect ? 'correct' : 'incorrect'].remove(currentId));
    dispatch(quiz.answer.reset());
    pristineReview = null;
    done();
  },
});

export const quizAnswerRecordLogic = createLogic({
  type: quiz.answer.record.request,
  throttle: 1000,
  processOptions: {
    failType: quiz.answer.record.failure,
  },

  process({ getState, action: { payload, meta } }, dispatch, done) {
    dispatch(quiz.answer.reset());
    dispatch(app.review.update());
    dispatch(app[meta.category].current.set());
    const previouslyIncorrect = selectIncorrectIds(getState(), { category: meta.category }).includes(payload.id);
    return recordReview({ ...payload, previouslyIncorrect })
      .then(() => { done(); })
      .catch((err) => err);
  },
});

export default [
  quizAnswerSubmitLogic,
  quizAnswerIgnoreLogic,
  quizAnswerRecordLogic,
];
