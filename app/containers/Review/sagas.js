/* eslint-disable no-console */
/* eslint-disable no-constant-condition */

import { take, select, call, put, race, fork, cancel } from 'redux-saga/effects';
import { takeLatest, takeEvery } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';
import {
  CHECK_ANSWER,
  PROCESS_ANSWER,
  MARK_CORRECT,
  MARK_INCORRECT,
  MARK_IGNORED,
} from 'containers/ReviewAnswer/constants';

import {
  markCorrect,
  markIncorrect,
} from 'containers/ReviewAnswer/actions';

import { shapeReviewData } from './utils';

import {
  LOAD_REVIEWDATA,
  MOVE_CURRENT_TO_COMPLETED,
} from './constants';

import {
  loadReviewData,
  reviewDataLoaded,
  reviewDataLoadingError,
  returnCurrentToQueue,
  moveCurrentToCompleted,
  setNewCurrent,
  increaseCurrentStreak,
  decreaseCurrentStreak,
  resetCurrentStreak,
  increaseSessionCorrect,
  increaseSessionIncorrect,
} from './actions';

import {
  selectCurrent,
  selectCompletedCount,
  selectQueueCount,
  selectTotalCount,
} from './selectors';

import {
  selectAnswerMatches,
  selectAnswerValid,
} from '../AnswerInput/selectors';


/**
 *  request/response handler
 */
export function* getReviewData(limit = 100) {
  const requestURL = `api/reviews/?limit=${limit}`;

  try {
    // Call our request helper (see 'utils/request')
    const data = yield call(request, requestURL);
    const shapedData = shapeReviewData(data);
    yield [
      put(reviewDataLoaded(shapedData)),
      put(setNewCurrent()),
    ];
  } catch (err) {
    yield put(reviewDataLoadingError(err));
  }
}

export function* recordAnswer() {
  const [current/* , authToken */] = yield [
    select(selectCurrent()),
    // select(selectAuthToken())
  ];
  const [id, correct, previouslyWrong] = [
    current.get('id'),
    current.getIn(['session', 'correct']) >= 1,
    current.getIn(['session', 'incorrect']) > 1,
  ];

  const postData = {
    csrfmiddlewaretoken: 'csrf here',
    user_specific_id: id,
    user_correct: correct,
    wrong_before: previouslyWrong,
  };

  // TODO: use axios; request is just a fetch function
  // yield fork(request, postURL, postData);

  try {
    console.info(postData);
    console.log('recorded on server');
    // put(recordAnswerSuccess())
  } catch (err) {
    // TODO: catch errors and notify user answer not recorded but returned to queue instead
    // put(recordAnswerFailure(message))
  } finally {
    // TODO: move to take(RECORD_ANSWER_SUCCESS)
    if (correct && !previouslyWrong) yield put(increaseSessionCorrect());

    // NOTE: if incorrect, we don't need to record answer - this should be an early escape clause
    if (!correct && !previouslyWrong) yield put(increaseSessionIncorrect());

    // TODO: take(RECORD_ANSWER_FAILURE) put(returnCurrentToQueue()) regardless
    yield put(correct ? moveCurrentToCompleted() : returnCurrentToQueue());
    yield put(setNewCurrent());
  }
}


/**
 * Watches for LOAD_REVIEWDATA actions and calls getReviewData when one comes in.
 * By using `takeLatest` only the result of the latest API call is applied.
 */
export function* getReviewDataWatcher() {
  yield fork(takeLatest, LOAD_REVIEWDATA, getReviewData);
}

export function* processAnswerWatcher() {
  yield fork(takeEvery, PROCESS_ANSWER, recordAnswer);
}

export function* checkAnswerWatcher() {
  while (true) {
    yield take(CHECK_ANSWER);

    const [valid, matches] = yield [
      select(selectAnswerValid()),
      select(selectAnswerMatches()),
    ];

    // TODO: terminal N, tilde stuff here

    if (valid && !matches) yield put(markIncorrect());
    if (valid && matches) yield put(markCorrect());
  }
}

export function* markAnswersWatcher() {
  while (true) {
    const { correct, incorrect, ignored } = yield race({
      correct: take(MARK_CORRECT),
      incorrect: take(MARK_INCORRECT),
      ignored: take(MARK_IGNORED),
    });

    const current = yield select(selectCurrent());
    const currentID = current.get('id');
    const currentIncorrectCount = current.getIn(['session', 'incorrect']);
    const previouslyWrong = currentIncorrectCount >= 1;
    const firstTimeWrong = currentIncorrectCount === 1;
    const currentStreak = current.get('streak');

    if (correct && !previouslyWrong) {
      yield put(increaseCurrentStreak(currentStreak));
      console.log(`${currentID} Correct ${!previouslyWrong ? 'Not previously wrong ' : ''}-> should be moved to complete`);
    }
    // if (correct && settings.autoAdvance) {
    //   yield put(processAnswer());
    // }
    if (incorrect && firstTimeWrong) {
      yield put(decreaseCurrentStreak(currentStreak));
      console.log(`${currentID} Incorrect ${firstTimeWrong ? 'first time ' : ''}-> should be returned to queue`);
    }
    if (ignored) {
      const previousStreak = current.get('previousStreak');
      console.log(`${currentID} Ignored -> returned to queue
Streak reset to ${previousStreak} from ${currentStreak}`);
      yield [
        put(resetCurrentStreak()),
        put(returnCurrentToQueue()),
        put(setNewCurrent()),
      ];
    }
  }
}

export function* moveCurrentToCompletedWatcher() {
  while (true) {
    yield take(MOVE_CURRENT_TO_COMPLETED);

    const [queue, total, completed] = yield [
      select(selectQueueCount()),
      select(selectTotalCount()),
      select(selectCompletedCount()),
    ];

    const needMoreReviews = (queue < 10) && (queue + completed < total);
    const queueCompleted = completed === total;
    if (needMoreReviews) {
      console.log('fetching more reviews...');
      yield put(loadReviewData());
      console.log('fetched more reviews!');
    }
    if (queueCompleted) {
      console.log('all reviews complete, show summary page now');
      // TODO: stop quiz and show summary page -> showSummary() action
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
    fork(checkAnswerWatcher),
    fork(markAnswersWatcher),
    fork(processAnswerWatcher),
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
