import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import markAllAsDaemon from 'utils/markAllAsDaemon';
import request from 'utils/request';

import reviewSessionSagas from 'containers/ReviewSession/sagas';
import reviewSummarySagas from 'containers/ReviewSummary/sagas';

import shapeReviewData from './utils/shapeReviewData';

import {
  LOAD_REVIEWDATA,
} from './constants';
import {
  reviewDataLoaded,
  reviewDataLoadingError,
} from './actions';

export function* getReviewData() {
  const requestURL = 'api/reviews/';
  try {
    const data = yield call(request, requestURL);
    const shapedData = shapeReviewData(data);
    yield put(reviewDataLoaded(shapedData));
  } catch (err) {
    yield put(reviewDataLoadingError(err));
  }
}

export function* getReviewDataWatcher() {
  yield takeLatest(LOAD_REVIEWDATA, getReviewData);
}

// Mark watchers to only run once on route entry
const watchers = markAllAsDaemon([getReviewDataWatcher]);

// Bootstrap sagas
export default [
  ...watchers,
  ...reviewSessionSagas,
  ...reviewSummarySagas,
];
