import { takeEvery, put, fork } from 'redux-saga/effects';
import types from 'containers/App/constants';
import synonymFormTypes from 'containers/AddSynonymForm/constants';
import reviewTypes from 'containers/ReviewSession/constants';
import vocabTypes from 'containers/VocabularyPage/constants';
import * as Notification from 'containers/Notifications/actions';

export function* notifyError({ payload: { notification } }) {
  console.error(notification.error); // eslint-disable-line no-console
  yield put(Notification.error({ ...notification, autoDismiss: 0 }));
  // TODO: log errors to server, perhaps include a 'type' (api, misc etc) in payload and filter by that
  // yield call(ServerLog, { title, message, error });
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
    takeEvery(types.LEVEL.LOAD.FAILURE, notifyError),
    takeEvery(types.LEVELS.LOAD.FAILURE, notifyError),
    takeEvery(types.ENTRY.LOAD.FAILURE, notifyError),
    takeEvery(synonymFormTypes.ADD.SUCCESS, notifySuccess),
    takeEvery(synonymFormTypes.ADD.FAILURE, notifyError),
    takeEvery(synonymFormTypes.REMOVE.SUCCESS, notifySuccess),
    takeEvery(synonymFormTypes.REMOVE.FAILURE, notifyError),
    takeEvery(reviewTypes.ANSWER.RECORD.FAILURE, notifyError),
    takeEvery(vocabTypes.LEVEL.LOCK.SUCCESS, notifyInfo),
    takeEvery(vocabTypes.ENTRY.LOCK.SUCCESS, notifyInfo),
    takeEvery(vocabTypes.LEVEL.LOCK.FAILURE, notifyError),
    takeEvery(vocabTypes.ENTRY.LOCK.FAILURE, notifyError),
    takeEvery(vocabTypes.LEVEL.UNLOCK.SUCCESS, notifyInfo),
    takeEvery(vocabTypes.ENTRY.UNLOCK.SUCCESS, notifyInfo),
    takeEvery(vocabTypes.LEVEL.UNLOCK.FAILURE, notifyError),
    takeEvery(vocabTypes.ENTRY.UNLOCK.FAILURE, notifyError),
  ];
}

export function* rootSaga() {
  yield fork(notificationsWatcher);
}

export default rootSaga;
