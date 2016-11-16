/**
 * Gets the userData of the user from Github
 */

import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_USERDATA } from 'containers/App/constants';
import { userDataLoaded, userDataLoadingError } from 'containers/App/actions';

import request from 'utils/request';

function shapeUserData(data) {
  const {
    name,
    review_count: reviewsCount,
    api_key: apiKey,
    api_valid: apiValid,
    join_date: joinDate,
    last_wanikani_sync_date: lastWkSyncDate,
    level,
    unlocked_levels: unlockedLevels,
    follow_me: followMe,
    auto_advance_on_success: autoAdvanceCorrect,
    auto_expand_answer_on_success: autoExpandCorrect,
    auto_expand_answer_on_failure: autoExpandIncorrect,
    only_review_burned: burnedOnly,
    on_vacation: onVacation,
    vacation_date: vacationDate,
  } = data;

  const user = Object.assign({}, {
    name,
    reviewsCount,
    apiKey,
    apiValid,
    joinDate, // TODO: if (!= null) convert to date - use moment?
    lastWkSyncDate, // TODO: if (!= null) convert to date - use moment?
    level,
    unlockedLevels,
    settings: {
      followMe,
      autoAdvanceCorrect,
      autoExpandCorrect,
      autoExpandIncorrect,
      burnedOnly,
      onVacation,
      vacationDate, // TODO: if (!= null) convert to date - use moment?
    },
  });

  return user;
}

/**
 * userData request/response handler
 */
export function* getUserData() {
  const requestURL = 'api/profiles';

  try {
    // Call our request helper (see 'utils/request')
    const data = yield call(request, requestURL);
    yield put(userDataLoaded(shapeUserData(data)));
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
export function* userData() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(getUserDataWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  userData,
];
