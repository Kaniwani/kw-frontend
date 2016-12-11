import { take, call, put, fork, cancel } from 'redux-saga/effects'; // eslint-disable-line no-unused-vars
import { LOCATION_CHANGE } from 'react-router-redux';

/**
 * Root saga manages watcher lifecycle
 */
export function* homeSaga() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(/* watchers */);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [];
