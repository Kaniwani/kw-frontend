import { takeLatest } from 'redux-saga';
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

export function* watchReturnToQueue() {
  while (true) {
    yield take(RETURN_CURRENT_TO_QUEUE);
    yield put(setNewCurrent());
  }
}

export function* watchMoveCurrentToCompleted() {
  while (true) {
    yield take(MOVE_CURRENT_TO_COMPLETED);

    const [reviews, total, completed] = yield [
      select(selectReviewsCount()),
      select(selectTotalCount()),
      select(selectCompletedCount()),
    ];
    if (reviews < 10 && (reviews + completed) < total) {
      yield put(loadReviewData());
    } else if (completed === total) {
      console.log('go to summary page here');
      // TODO: stop quiz and show summary page -> showSummary() action
    } else {
      yield put(setNewCurrent());
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* reviewSaga() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(getReviewDataWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  reviewSaga,
  watchReturnToQueue,
  watchMoveCurrentToCompleted,
];
