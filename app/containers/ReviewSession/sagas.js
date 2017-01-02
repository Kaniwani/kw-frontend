/* eslint-disable no-console */
/* eslint-disable no-constant-condition */

import { takeEvery, delay } from 'redux-saga';
import { take, select, call, fork, put, race } from 'redux-saga/effects';
import { history } from 'app';
import markAllAsDaemon from 'utils/markAllAsDaemon';
import isEmpty from 'lodash/isEmpty';
import post from 'utils/post';

import {
  isHiragana,
  isKatakana,
  isKanjiKana,
} from 'kanawana';

import {
  selectSettings,
} from 'containers/App/selectors';

import {
  selectInputText,
} from 'containers/AnswerInput/selectors';

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
  toggleInfoPanels,
  toggleNewSynonymPanel,
  toggleInfoDepth,
} from 'containers/ReviewInfo/actions';

import {
  answersContainTilde,
  fixStartingTilde,
  fixTerminalN,
  keysInListMatch,
} from 'containers/ReviewAnswer/utils';

import {
  loadReviewData,
} from 'containers/ReviewPage/actions';

import {
  LOAD_REVIEWDATA_SUCCESS,
} from 'containers/ReviewPage/constants';

import {
  COPY_CURRENT_TO_COMPLETED,
} from './constants';

import {
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
  selectCompletedCount,
  selectQueueCount,
  selectTotalCount,
} from 'containers/ReviewPage/selectors';

import {
  selectCurrent,
  selectCurrentMeaning,
  selectCurrentReadings,
} from './selectors';

// TODO: move to reviewPage saga?
export function* loadReviewDataSuccessWatcher() {
  while (true) {
    yield take(LOAD_REVIEWDATA_SUCCESS);
    const [meaning, queueCount] = yield [
      select(selectCurrentMeaning()),
      select(selectQueueCount()),
    ];
    if (isEmpty(meaning) && queueCount !== 0) {
      yield put(setNewCurrent());
    }
  }
}

export function* recordAnswer() {
  const [current/* , authToken */] = yield [
    select(selectCurrent()),
    // select(selectAuthToken())
  ];
  const [id, correct, previouslyWrong, firstTimeWrong] = [
    current.get('id'),
    current.getIn(['session', 'correct']) >= 1,
    current.getIn(['session', 'incorrect']) > 1,
    current.getIn(['session', 'incorrect']) === 1,
  ];

  const postData = {
    user_specific_id: id,
    user_correct: correct,
    wrong_before: previouslyWrong,
  };

  const postUrl = '/api/v1/';

  try {
    if (correct || (!correct && firstTimeWrong)) {
      const response = yield fork(post, postUrl, postData);
      // console.log(postData);
      console.log(response);
      // if (response) put(recordAnswerSuccess());
    }
  } catch (err) {
    // TODO: catch errors and notify user answer not recorded but returned to queue instead
    // put(recordAnswerError(message))
  } finally {
    // TODO: move to take(RECORD_ANSWER_SUCCESS)
    if (correct && !previouslyWrong) yield put(increaseSessionCorrect());
    if (!correct && !previouslyWrong) yield put(increaseSessionIncorrect());

    // TODO: take(RECORD_ANSWER_ERROR)
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
    put(toggleInfoPanels({ hide: true })),
    put(toggleNewSynonymPanel({ hide: true })),
    put(toggleInfoDepth({ level: 1 })),
    put(setNewCurrent()),
    put(resetAnswer()),
  ];
}

export function* checkAnswer() {
  let [readings, inputText] = yield [ // eslint-disable-line prefer-const
    select(selectCurrentReadings()),
    select(selectInputText()),
  ];

  readings = readings.toJS();

  let answer = inputText.trim();
  const hasContent = !isEmpty(answer);

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
    yield call(delay, 1500);
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
      yield put(toggleInfoPanels({ show: true }));
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
      yield put(loadReviewData(false));
      console.log('fetched more reviews!');
    }
    if (queueCompleted) {
      // TODO: clear flag regarding localstorage { session: 'active' }
      yield history.push('/review/summary');
    }
  }
}

const watchers = markAllAsDaemon([
  loadReviewDataSuccessWatcher,
  checkAnswerWatcher,
  markAnswerWatcher,
  processAnswerWatcher,
  autoAdvanceWatcher,
  copyCurrentToCompletedWatcher,
]);

export default [
  ...watchers,
];
