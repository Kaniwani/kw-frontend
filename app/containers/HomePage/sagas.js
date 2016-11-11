/**
 * Gets the userData of the user from Github
 */

import { takeLatest } from 'redux-saga';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_USERDATA } from 'containers/App/constants';
import { userDataLoaded, userDataLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { selectUsername } from 'containers/HomePage/selectors';

/**
 * userData request/response handler
 */
export function* getUserData() {
  // Select username from store
  const username = yield select(selectUsername());
  const requestURL = 'http://localhost:3000/api';
  // const requestURL = `http://localhost:3000/shared/${username}/userData?type=all&sort=updated`;

  try {
    // Call our request helper (see 'utils/request')
    const userData = yield call(request, requestURL);
    yield put(userDataLoaded(userData, username));
  } catch (err) {
    yield put(userDataLoadingError(err));
  }
}

/**
 * Watches for LOAD_USERDATA actions and calls getUserData when one comes in.
 * By using `takeLatest` only the result of the latest API call is applied.
 */
export function* getUserDataWatcher() {
  yield fork(takeLatest, LOAD_USERDATA, getUserData);
}

/**
 * Root saga manages watcher lifecycle
 */
export function* kwUserData() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(getUserDataWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  kwUserData,
];
