import { LOCATION_CHANGE } from 'react-router-redux';
import { takeLatest, takeEvery, select, call, put, fork } from 'redux-saga/effects';
import request from 'utils/request';
import shapeUserData from './utils/shapeUserData';
import { LOAD } from 'redux-storage';
import { LOAD_USERDATA, LOAD_USERDATA_ERROR } from 'containers/App/constants';
import { createUserUrl } from 'shared/urls';
import { selectUser } from 'containers/App/selectors';
import { selectIsReviewSyncNeeded } from 'containers/ReviewPage/selectors';
import { selectCurrentMeaning } from 'containers/ReviewSession/selectors';
import {
  loadUserData,
  userDataLoaded,
  userDataLoadingError,
} from 'containers/App/actions';
import {
  ADD_SYNONYM_SUCCESS,
  ADD_SYNONYM_ERROR,
  REMOVE_SYNONYM_ERROR,
} from 'containers/AddSynonymForm/constants';
import {
  loadReviewData,
} from 'containers/ReviewPage/actions';
import * as Notification from 'containers/Notifications/actions';
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

  if (location === '/') {
    if (needUserSync) yield put(loadUserData());
    // if (needReviewSync) yield put(loadReviewData(false)); // zzz not present in app reducer yet
  }
  if (/review/.test(location)) {
    if (needReviewSync) {
      // FIXME: review saga not async loaded when this gets called if navigating from dashboard...
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
  const requestURL = createUserUrl('me');

  try {
    const data = yield call(request, requestURL);
    yield put(userDataLoaded(shapeUserData(data)));
  } catch (err) {
    yield put(userDataLoadingError({
      title: 'Connection error',
      message: `Unable to fetch user data from server: ${err.message}`,
      error: err,
    }));
  }
}

export function* notifyError({ payload: { title, message, err } }) {
  console.error(err); // eslint-disable-line no-console
  yield put(Notification.error({ title, message }));
  // TODO: log errors to server, perhaps include a 'type' (api, misc etc) in payload and filter by that
  // yield call(ServerLog, { title, message, err });
}

export function* notifySuccess({ payload: { title, message } }) {
  yield put(Notification.success({ title, message }));
}

export function* notifyInfo({ payload: { title, message } }) {
  yield put(Notification.info({ title, message }));
}

/**
 * Watches for LOAD_USERDATA actions and calls getUserData when one comes in.
 * By using `takeLatest` only the result of the latest API call is applied.
 */
export function* getUserDataWatcher() {
  yield takeLatest(LOAD_USERDATA, getUserData);
}

export function* notificationWatcher() {
  // TODO: take all errors from any error constant
  yield [
    takeEvery(ADD_SYNONYM_SUCCESS, notifySuccess),
    takeEvery(LOAD_USERDATA_ERROR, notifyError),
    takeEvery(ADD_SYNONYM_ERROR, notifyError),
    takeEvery(REMOVE_SYNONYM_ERROR, notifyError),
  ];
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
    fork(notificationWatcher),
  ];

  // Can't image we ever want to cancel these watchers really, since app is root level anyway
  // yield take(LOCATION_CHANGE);
  // yield cancel(...watchers);
}

// Bootstrap sagas
export default [
  rootSaga,
];
