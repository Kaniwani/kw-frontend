/* eslint-disable no-console */
/* eslint-disable no-constant-condition */

import { take, select, call, put, race, fork, cancel } from 'redux-saga/effects';
import { takeLatest, takeEvery, delay } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import { isKanjiKana } from 'shared/kanawana/core';
import request from 'utils/request';
import isEmpty from 'utils/isEmpty';
import { selectSettings } from 'containers/App/selectors';
import { selectInputText } from 'containers/AnswerInput/selectors';
import {
  CHECK_ANSWER,
  PROCESS_ANSWER,
  START_AUTO_ADVANCE,
  CANCEL_AUTO_ADVANCE,
  MARK_CORRECT,
  MARK_INCORRECT,
  MARK_IGNORED,
} from 'containers/ReviewAnswer/constants';
import {
  markCorrect,
  markIncorrect,
  updateAnswer,
  processAnswer,
  startAutoAdvance,
  cancelAutoAdvance,
} from 'containers/ReviewAnswer/actions';
import {
  showVocabInfo,
  hideVocabInfo,
} from 'containers/ReviewInfo/actions';
import {
  answersContainTilde,
  fixStartingTilde,
  fixTerminalN,
  keysInListMatch,
} from 'containers/ReviewAnswer/utils';
import { shapeReviewData } from './utils';
import {
  LOAD_REVIEWDATA,
  COPY_CURRENT_TO_COMPLETED,
} from './constants';
import {
  loadReviewData,
  reviewDataLoaded,
  reviewDataLoadingError,
  returnCurrentToQueue,
  copyCurrentToCompleted,
  setNewCurrent,
  increaseCurrentStreak,
  decreaseCurrentStreak,
  resetCurrentStreak,
  increaseSessionCorrect,
  increaseSessionIncorrect,
} from './actions';
import {
  selectCurrent,
  selectCurrentReadings,
  selectCompletedCount,
  selectQueueCount,
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
    yield [
      put(reviewDataLoaded(shapedData)),
      // TODO: currently this would setNewCurrent when a second load of reviews loads
      // we need to avoid that happening since user is still answering a question during the optimistic load
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
    yield put(correct ? copyCurrentToCompleted() : returnCurrentToQueue());

    // TODO: bundle these all into a 'reset and load new current' task?
    yield [
      put(hideVocabInfo()),
      put(setNewCurrent()),
      put(updateAnswer({
        inputText: '',
        matches: false,
        valid: null,
        marked: false,
        inputDisabled: false,
      })),
    ];
    yield put(cancelAutoAdvance());
  }
}

export function* checkAnswer() {
  let [readings, inputText] = yield [ // eslint-disable-line prefer-const
    select(selectCurrentReadings()),
    select(selectInputText()),
  ];

  let answer = inputText.trim();
  const hasContent = !isEmpty(answer);
  readings = readings.toJS();

  if (hasContent) {
    answer = fixTerminalN(answer);
    if (answersContainTilde(readings)) {
      answer = fixStartingTilde(answer);
    }
  }

  const valid = hasContent && isKanjiKana(answer);
  const matches = keysInListMatch(readings, ['kana', 'character'], answer);
  const correct = valid && matches;

  yield put(updateAnswer({
    valid,
    matches,
    inputText: (correct ? answer : inputText),
  }));
  if (correct) yield put(markCorrect());
  if (valid && !matches) yield put(markIncorrect());
}

export function* autoAdvance() {
  while (true) {
    yield call(delay, 1000);
    yield put(processAnswer());
  }
}

export function* autoAdvanceWatcher() {
  while (true) {
    yield take(START_AUTO_ADVANCE);
    yield race({
      task: call(autoAdvance),
      cancel: take(CANCEL_AUTO_ADVANCE),
    });
  }
}

export function* getReviewDataWatcher() {
  yield takeLatest(LOAD_REVIEWDATA, getReviewData);
}

export function* processAnswerWatcher() {
  yield takeEvery(PROCESS_ANSWER, recordAnswer);
}

export function* checkAnswerWatcher() {
  yield takeEvery(CHECK_ANSWER, checkAnswer);
}

export function* markAnswerWatcher() {
  while (true) {
    const { correct, incorrect, ignored } = yield race({
      correct: take(MARK_CORRECT),
      incorrect: take(MARK_INCORRECT),
      ignored: take(MARK_IGNORED),
    });

    const [current, settings] = yield [
      select(selectCurrent()),
      select(selectSettings()),
    ];
    const currentID = current.get('id');
    const currentIncorrectCount = current.getIn(['session', 'incorrect']);
    const previouslyWrong = currentIncorrectCount >= 1;
    const firstTimeWrong = currentIncorrectCount === 1;
    const currentStreak = current.get('streak');

    if (correct && !previouslyWrong) {
      yield put(increaseCurrentStreak(currentStreak));
      console.log(`${currentID} Correct ${!previouslyWrong ? 'Not previously wrong ' : ''}-> should be copied to complete`);
    }

    if ((correct && settings.get('autoExpandCorrect')) ||
        (incorrect && settings.get('autoExpandIncorrect'))) {
      yield put(showVocabInfo());
    }

    if (correct && settings.get('autoAdvanceCorrect')) {
      yield put(startAutoAdvance());
    }

    if (incorrect && firstTimeWrong) {
      yield put(decreaseCurrentStreak(currentStreak));
      console.log(`${currentID} Incorrect ${firstTimeWrong ? 'first time ' : ''}-> should be returned to queue`);
    }
    if (ignored) {
      const previousStreak = current.get('previousStreak');
      console.log(`${currentID} Ignored -> returned to queue
Streak reset to ${previousStreak} from ${currentStreak}`);
      yield [
        put(cancelAutoAdvance()),
        put(resetCurrentStreak()),
        put(returnCurrentToQueue()),
        // TODO: this is almost the same as the end of RecordAnswer, extract similar "reset" puts
        put(hideVocabInfo()),
        put(setNewCurrent()),
        put(updateAnswer({
          inputText: '',
          matches: false,
          valid: null,
          marked: false,
          inputDisabled: false,
        })),
      ];
    }
  }
}

export function* copyCurrentToCompletedWatcher() {
  while (true) {
    yield take(COPY_CURRENT_TO_COMPLETED);

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
    fork(markAnswerWatcher),
    fork(autoAdvanceWatcher),
    fork(processAnswerWatcher),
    fork(copyCurrentToCompletedWatcher),
  ];

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(...watchers);
}

// Bootstrap sagas
export default [
  reviewSaga,
];
