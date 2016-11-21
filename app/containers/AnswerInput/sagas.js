import { call } from 'redux-saga/effects';

// Individual exports for testing
export function* answerInputSaga() {
  yield call(console.log, 'test'); // eslint-disable-line no-console
}

// All sagas to be loaded
export default [
  answerInputSaga,
];
