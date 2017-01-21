import { takeLatest, takeEvery, select, call, put, fork } from 'redux-saga/effects';
import { userProfileSerializer, reviewEntriesSerializer } from 'shared/serializers';
import * as api from 'shared/api';
import * as storageTypes from 'redux-storage';
import types from 'containers/App/constants';
import synonymFormTypes from 'containers/AddSynonymForm/constants';
import reviewTypes from 'containers/ReviewSession/constants';
import { selectQueueOffset } from 'containers/ReviewSession/selectors';
import actions from 'containers/App/actions';
import * as Notification from 'containers/Notifications/actions';
import { selectUserSyncNeeded, selectReviewCount, selectAuthToken } from './selectors';

export function* handleLoad() {
  yield call(loginRequest);
  const userSync = yield select(selectUserSyncNeeded);
  if (userSync) {
    yield [
      put(actions.srsRequest()),
      put(actions.loadUserRequest({ indicate: true })),
    ];
  } else {
    yield put(actions.updateGlobal({ loading: false }));
  }
}

export function* srsRequest() {
  const token = yield select(selectAuthToken);
  const clientCount = yield select(selectReviewCount);
  try {
    const { review_count: serverCount } = yield call(api.syncKw, { token });
    if (clientCount !== serverCount) {
      yield [
        put(actions.updateGlobal({ reviewCount: serverCount })),
        put(actions.loadReviewsRequest({ indicate: false })),
        put(actions.srsRequestSuccess(serverCount, {
          title: 'Review sync',
          message: `${serverCount} reviews ready.`,
        })),
      ];
    }
  } catch (err) {
    yield put(actions.srsRequestFailure({
      title: 'Connection error',
      message: `Unable to sync review count from server: “${err.message}”`,
      error: err,
    }));
  }
}

export function* loginRequest() {
  try {
    const { token } = yield call(api.loginUser, {
      username: 'duncantest',
      password: 'dadedade',
    });
    yield put(actions.loginRequestSuccess(token));
  } catch (err) {
    yield put(actions.loginRequestFailure({
      title: 'Login error',
      message: `Unable to obtain authentication token: “${err.message}”`,
      error: err,
    }));
  }
}
export function* loadUserRequest() {
  const token = yield select(selectAuthToken);
  try {
    const data = yield call(api.getUserProfile, { token });
    yield put(actions.loadUserSuccess(userProfileSerializer(data)));
  } catch (err) {
    yield put(actions.loadUserFailure({
      title: 'Connection error',
      message: `Unable to fetch user data from server: “${err.message}”`,
      error: err,
    }));
  }
}

export function* loadReviewsRequest() {
  const token = yield select(selectAuthToken);
  const offset = yield select(selectQueueOffset);
  try {
    const data = yield call(api.getCurrentReviews, { token, offset /* limit */ });
    yield put(actions.loadReviewsSuccess({
      total: data.count,
      ...reviewEntriesSerializer(data.results),
    }));
  } catch (err) {
    yield put(actions.loadReviewsFailure(err));
  }
}

export function* requestsWatcher() {
  yield [
    takeLatest(storageTypes.LOAD, handleLoad),
    takeLatest(types.AUTH.LOGIN.REQUEST, loginRequest),
    takeLatest(types.USER.SRS.REQUEST, srsRequest),
    takeLatest(types.USER.LOAD.REQUEST, loadUserRequest),
    takeLatest(types.REVIEWS.LOAD.REQUEST, loadReviewsRequest),
  ];
}

export function* notifyError({ payload: { notification } }) {
  console.error(notification.err); // eslint-disable-line no-console
  yield put(Notification.error({ ...notification, autoDismiss: 0 }));
  // TODO: log errors to server, perhaps include a 'type' (api, misc etc) in payload and filter by that
  // yield call(ServerLog, { title, message, err });
  // https://rollbar.com/
}

export function* notifySuccess({ payload: { notification } }) {
  yield put(Notification.success({ ...notification, autoDismiss: 2 }));
}

export function* notifyInfo({ payload: { notification } }) {
  yield put(Notification.info({ ...notification, autoDismiss: 5 }));
}

export function* notificationsWatcher() {
  yield [
    takeEvery(types.AUTH.LOGIN.FAILURE, notifyError),
    takeEvery(types.USER.SRS.SUCCESS, notifyInfo),
    takeEvery(types.USER.SRS.FAILURE, notifyError),
    takeEvery(types.USER.LOAD.FAILURE, notifyError),
    takeEvery(types.REVIEWS.LOAD.FAILURE, notifyError),
    takeEvery(synonymFormTypes.ADD.SUCCESS, notifySuccess),
    takeEvery(synonymFormTypes.ADD.FAILURE, notifyError),
    takeEvery(synonymFormTypes.REMOVE.SUCCESS, notifySuccess),
    takeEvery(synonymFormTypes.REMOVE.FAILURE, notifyError),
    takeEvery(reviewTypes.ANSWER.RECORD.FAILURE, notifyError),
  ];
}

/**
 * Root saga manages watcher lifecycle
 */
export function* rootSaga() {
  // Fork watchers so we can continue execution
  yield [
    // fork(locationChangeWatcher),
    fork(requestsWatcher),
    fork(notificationsWatcher),
  ];

  // NOTE: we shouldn't ever want to cancel these watchers, since app sagas should always be available
  // yield take(LOCATION_CHANGE);
  // yield cancel(...watchers);
}

// Bootstrap sagas
export default [
  rootSaga,
];
