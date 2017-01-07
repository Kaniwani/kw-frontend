import { takeLatest, call } from 'redux-saga/effects';
import markAllAsDaemon from 'utils/markAllAsDaemon';
import { LOCATION_CHANGE } from 'react-router-redux';

function* log(...args) {
  yield call(console.log, 'location changed!', args); // eslint-disable-line no-console
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
