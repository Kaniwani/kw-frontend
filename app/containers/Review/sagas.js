import { takeEvery, takeLatest } from 'redux-saga';
import { take, select, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { shapeReviewData } from './utils';
import request from 'utils/request';
import {
  LOAD_REVIEWDATA,
  RETURN_CURRENT_TO_QUEUE,
  MOVE_CURRENT_TO_COMPLETED,
} from './constants';
import {
  loadReviewData,
  reviewDataLoaded,
  reviewDataLoadingError,
  setNewCurrent,
} from './actions';
import {
  selectCompletedCount,
  selectReviewsCount,
  selectTotalCount,
} from './selectors';

/**
 *  request/response handler
 */
export function* getReviewData(limit = 100) {
  const requestURL = `api/reviews/?limit=${limit}`;

  try {
    // Call our request helper (see 'utils/request')
    const data = yield call(request, requestURL);
    const shapedData = shapeReviewData(data);
    yield put(reviewDataLoaded(shapedData));
    yield put(setNewCurrent());
  } catch (err) {
    yield put(reviewDataLoadingError(err));
  }
}

/**
 * Watches for LOAD_REVIEWDATA actions and calls getReviewData when one comes in.
 * By using `takeLatest` only the result of the latest API call is applied.
 */
export function* getReviewDataWatcher() {
  yield fork(takeLatest, LOAD_REVIEWDATA, getReviewData);
}

export function* returnToQueueWatcher() {
  yield takeEvery(RETURN_CURRENT_TO_QUEUE, () => put(setNewCurrent()));
}

export function* moveCurrentToCompletedWatcher() {
  while (true) {
    yield take(MOVE_CURRENT_TO_COMPLETED);

    const [reviews, total, completed] = yield [
      select(selectReviewsCount()),
      select(selectTotalCount()),
      select(selectCompletedCount()),
    ];

    const needMoreReviews = reviews < 10 && (reviews + completed) < total;
    const queueCompleted = completed === total;
    if (needMoreReviews) {
      console.log('fetching more reviews...');
      yield put(loadReviewData());
      console.log('fetched more reviews!');
    } else if (queueCompleted) {
      console.log('all reviews complete, show summary page now');
      // TODO: stop quiz and show summary page -> showSummary() action
    } else {
      /* yield put(recordCurrentAnswer) */
      yield put(setNewCurrent());
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* reviewSaga() {
  // Fork watchers so we can continue execution
  const watchers = yield [
    fork(getReviewDataWatcher),
    fork(returnToQueueWatcher),
    fork(moveCurrentToCompletedWatcher),
  ];

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(...watchers);
}

// Bootstrap sagas
export default [
  reviewSaga,
];
