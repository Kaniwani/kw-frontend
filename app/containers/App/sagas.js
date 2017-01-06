// import { LOCATION_CHANGE } from 'react-router-redux';
import { takeLatest, select, call, put, fork } from 'redux-saga/effects';
import request from 'utils/request';
import shapeUserData from './utils/shapeUserData';
import { LOAD } from 'redux-storage';
import { LOAD_USERDATA } from 'containers/App/constants';
import { selectIsUserSyncNeeded } from 'containers/App/selectors';
import { selectIsReviewSyncNeeded } from 'containers/ReviewPage/selectors';
import {
  loadUserData,
  userDataLoaded,
  userDataLoadingError,
} from 'containers/App/actions';
import {
  loadReviewData,
  // reviewDataLoaded,
} from 'containers/ReviewPage/actions';

export function* storageLoad() {
  const needUserSync = yield select(selectIsUserSyncNeeded());
  const needReviewSync = yield select(selectIsReviewSyncNeeded());

  if (needUserSync && needReviewSync) {
    yield [
      put(loadUserData(false)),
      put(loadReviewData(false)),
    ];
  } else if (needUserSync) {
    yield put(loadUserData(false));
  } else if (needReviewSync) {
    yield put(loadReviewData(false));
  }
}

/**
 * userData request/response handler
 */
export function* getUserData() {
  // const requestURL = 'api/profiles';
  const requestURL = 'http://localhost:8000/api/v1/profiles';

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

export function* storageLoadWatcher() {
  yield takeLatest(LOAD, storageLoad);
}

/**
 * Root saga manages watcher lifecycle
 */
export function* rootSaga() {
  // Fork watcher so we can continue execution
  /*  const watchers = */ yield [
    fork(getUserDataWatcher),
    fork(storageLoadWatcher),
  ];

  // Can't image we ever want to cancel these watchers really, since app is root level anyway
  // yield take(LOCATION_CHANGE);
  // yield cancel(...watchers);
}

// Bootstrap sagas
export default [
  rootSaga,
];
