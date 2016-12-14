/* eslint-disable no-console */
/* eslint-disable no-constant-condition */

// TODO: extract into container sagas, this is huge!

import { takeLatest, takeEvery, delay } from 'redux-saga';
import { take, select, call, put, race } from 'redux-saga/effects';
import {
  isHiragana,
  isKatakana,
  isKanjiKana,
} from 'shared/kanawana/core';

import request from 'utils/request';
import isEmpty from 'lodash/isEmpty';
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
  resetAnswer,
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
import shapeReviewData from './utils/shapeReviewData';
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
    console.log('pretend record');
    console.log(postData);
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
    yield [
      put(correct ? copyCurrentToCompleted() : returnCurrentToQueue()),
      call(resetReview),
      put(cancelAutoAdvance()),
    ];
  }
}

/**
 * Hides vocab info, sets new current question, and resets answer input
 */
export function* resetReview() {
  yield [
    put(hideVocabInfo()),
    put(setNewCurrent()),
    put(resetAnswer()),
  ];
}

export function* checkAnswer() {
  let [readings, inputText] = yield [ // eslint-disable-line prefer-const
    select(selectCurrentReadings()),
    select(selectInputText()),
  ];

  let answer = inputText.trim();
  const hasContent = !isEmpty(answer);
  // TODO: is this necessary? should be able to map over immutable
  // perhaps convert fix/answers/keysinlist etc to work with immutable api
  readings = readings.toJS();

  if (hasContent) {
    answer = fixTerminalN(answer);
    if (answersContainTilde(readings)) {
      answer = fixStartingTilde(answer);
    }
  }

  const allJapanese = isKanjiKana(answer);
  const answerType = (isHiragana(answer) || isKatakana(answer) ? 'kana' : 'mixed');
  const valid = hasContent && allJapanese;
  const matches = keysInListMatch(readings, ['kana', 'character'], answer);
  const correct = valid && matches;

  yield put(updateAnswer({
    valid,
    matches,
    answerType,
    inputText: (valid ? answer : inputText),
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
    const currentIncorrectCount = current.getIn(['session', 'incorrect']);
    const previouslyWrong = currentIncorrectCount >= 1;
    const firstTimeWrong = currentIncorrectCount === 1;

    if (correct && !previouslyWrong) {
      yield put(increaseCurrentStreak());
    }

    if ((correct && settings.get('autoExpandCorrect')) ||
        (incorrect && settings.get('autoExpandIncorrect'))) {
      yield put(showVocabInfo());
    }

    if (correct && settings.get('autoAdvanceCorrect')) {
      yield put(startAutoAdvance());
    }

    if (incorrect && firstTimeWrong) {
      yield put(decreaseCurrentStreak());
    }
    if (ignored) {
      yield [
        put(cancelAutoAdvance()),
        put(resetCurrentStreak()),
        put(returnCurrentToQueue()),
        call(resetReview),
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
    // console.log(
    //   'queue', queue,
    //   '\nqueue + completed < total', queue + completed < total,
    //   '\nneedMoreReviews', needMoreReviews,
    //   '\nqueueComplete', queueCompleted,
    // );
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

// Mark watchers to only run once on route entry
const markAsDaemon = (saga) => {
  saga.isDaemon = true; // eslint-disable-line no-param-reassign
  return saga;
};
const watchers = [
  getReviewDataWatcher,
  checkAnswerWatcher,
  markAnswerWatcher,
  processAnswerWatcher,
  autoAdvanceWatcher,
  copyCurrentToCompletedWatcher,
].map(markAsDaemon);

// Bootstrap sagas
export default watchers;
