import { takeLatest } from 'redux-saga';
import { call } from 'redux-saga/effects';
import markAllAsDaemon from 'utils/markAllAsDaemon';
import { LOCATION_CHANGE } from 'react-router-redux';

function* log() {
  yield call(console.log, 'you have left summary page summarysaga'); // eslint-disable-line no-console
}

function* defaultSaga() {
  yield takeLatest(LOCATION_CHANGE, log);
}

const watchers = markAllAsDaemon([
  defaultSaga,
]);

// Bootstrap sagas
export default [
  ...watchers,
];
