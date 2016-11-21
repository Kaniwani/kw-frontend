import { takeLatest } from 'redux-saga';
import { put, fork } from 'redux-saga/effects';
import { checkAnswer } from 'containers/Review/actions';
import { CHANGE_INPUT } from './constants';

export function* checkAnswerSaga({ text } /* = action */) {
  yield put(checkAnswer(text));
}
// Individual exports for testing
export function* answerInputWatcher() {
  yield fork(takeLatest, CHANGE_INPUT, checkAnswerSaga);
}

// All sagas to be loaded
export default [
  answerInputWatcher,
];
