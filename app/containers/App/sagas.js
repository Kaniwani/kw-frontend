import { LOCATION_CHANGE } from 'react-router-redux';
import { takeLatest, select, call, put, fork } from 'redux-saga/effects';
import request from 'utils/request';
import shapeUserData from './utils/shapeUserData';
import { LOAD } from 'redux-storage';
import { LOAD_USERDATA } from 'containers/App/constants';
import { createProfileUrl } from 'shared/urls';
import { selectUser } from 'containers/App/selectors';
import { selectIsReviewSyncNeeded } from 'containers/ReviewPage/selectors';
import { selectCurrentMeaning } from 'containers/ReviewSession/selectors';
import {
  loadUserData,
  userDataLoaded,
  userDataLoadingError,
} from 'containers/App/actions';
import {
  loadReviewData,
} from 'containers/ReviewPage/actions';
import {
  setNewCurrent,
} from 'containers/ReviewSession/actions';

import { MINUTES_SINCE_LAST_SYNC_LIMIT } from 'shared/constants';
import differenceInMinutes from 'date-fns/difference_in_minutes';

function* isUserSyncNeeded() {
  const user = yield select(selectUser());
  const lastSync = user.get('lastKwSyncDate');
  if (lastSync == null) return true;

  const needReviews = user.get('reviewCount') < 1;
  const timeDifference = differenceInMinutes(new Date(), new Date(lastSync));
  const timeLimitElapsed = timeDifference >= MINUTES_SINCE_LAST_SYNC_LIMIT;
  return needReviews || timeLimitElapsed;
}

export function* checkSync({ payload }) {
  const [needUserSync, needReviewSync, currentMeaning, location] = yield [
    call(isUserSyncNeeded),
    select(selectIsReviewSyncNeeded()),
    select(selectCurrentMeaning()),
    window.location.pathname || payload.pathname,
  ];
  const needsNewCurrent = currentMeaning === '';

  console.group('Syncing');
  console.log('usersync?', needUserSync);
  console.log('reviewsync?', needReviewSync);
  console.groupEnd('Syncing');

  if (location === '/') {
    if (needUserSync) yield put(loadUserData());
    // if (needReviewSync) yield put(loadReviewData(false)); // zzz not present in app reducer yet
  }
  if (/review/.test(location)) {
    if (needReviewSync) {
      yield put(loadReviewData());
    } else if (needsNewCurrent) {
      yield put(setNewCurrent());
    }
    if (needUserSync) {
      yield put(loadUserData(false));
    }
  }
}

/**
 * userData request/response handler
 */
export function* getUserData() {
  const requestURL = createProfileUrl();

  try {
    // Call our request helper (see 'utils/request')
    const data = yield call(request, requestURL);
    yield put(userDataLoaded(shapeUserData(data.results[0])));
  } catch (err) {
    yield put(userDataLoadingError(err));
  }
}

/**
 * Watches for LOAD_USERDATA actions and calls getUserData when one comes in.
 * By using `takeLatest` only the result of the latest API call is applied.
 */
export function* getUserDataWatcher() {
  yield takeLatest(LOAD_USERDATA, getUserData);
}

/**
 * Runs sync checks when storage is loaded
 */
export function* storageLoadWatcher() {
  yield takeLatest(LOAD, checkSync);
}

/**
 * Runs sync checks when location changes
 */
export function* locationChangeWatcher() {
  yield takeLatest(LOCATION_CHANGE, checkSync);
}

/**
 * Root saga manages watcher lifecycle
 */
export function* rootSaga() {
  // Fork watcher so we can continue execution
  /*  const watchers = */ yield [
    fork(getUserDataWatcher),
    fork(storageLoadWatcher),
    fork(locationChangeWatcher),
  ];

  // Can't image we ever want to cancel these watchers really, since app is root level anyway
  // yield take(LOCATION_CHANGE);
  // yield cancel(...watchers);
}

// Bootstrap sagas
export default [
  rootSaga,
];
