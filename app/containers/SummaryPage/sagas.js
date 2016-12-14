
import { takeLatest } from 'redux-saga';
import { call } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

function* log() {
  yield call(console.log, 'you have left summary page summarysaga');
}

function* defaultSaga() {
  yield takeLatest(LOCATION_CHANGE, log);
}

defaultSaga.isDaemon = true;

// Bootstrap sagas
export default [defaultSaga];
