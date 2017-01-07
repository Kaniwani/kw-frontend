/* eslint-disable no-console */
/* eslint-disable no-constant-condition */

import { delay } from 'redux-saga';
import { take, takeEvery, select, call, fork, put, race } from 'redux-saga/effects';
import { history } from 'app';
import markAllAsDaemon from 'utils/markAllAsDaemon';
import isEmpty from 'lodash/isEmpty';
import post from 'utils/post';
import { createReviewUrl } from 'shared/urls';

import {
  isHiragana,
  isKatakana,
  isKanjiKana,
  isKanji,
} from 'kanawana';

import {
  selectSettings,
} from 'containers/App/selectors';

import {
  resetUserDataReviewCount,
} from 'containers/App/actions';

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
  selectIsReviewSyncNeeded,
  selectIsQueueComplete,
  selectQueueCount,
} from 'containers/ReviewPage/selectors';

import {
  selectCurrent,
  selectCurrentMeaning,
  selectCurrentReadings,
} from './selectors';

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
  const current = yield select(selectCurrent());

  const [id, correct, previouslyWrong, firstTimeWrong] = [
    current.get('id'),
    current.getIn(['session', 'correct']) >= 1,
    current.getIn(['session', 'incorrect']) > 1,
    current.getIn(['session', 'incorrect']) === 1,
  ];

  // const token = document.cookie.match(/csrftoken=.*;/)[0];
  const postData = {
    // csrf_token: token,
    user_specific_id: id,
    user_correct: correct,
    wrong_before: previouslyWrong,
  };

  try {
    if (correct || (!correct && firstTimeWrong)) {
      const correctness = correct ? 'correct' : 'incorrect';
      const postUrl = createReviewUrl(id, { correctness });
      yield fork(post, postUrl, postData, { method: 'OPTIONS' /* wth ? */});
    }
  } catch (err) {
    // TODO: catch errors and notify user answer not recorded but added to an answersQueue for submission next time they're online
    console.error(err);
    // put(recordAnswerError(message))
  } finally {
    if (correct && !previouslyWrong) yield put(increaseSessionCorrect());
    if (!correct && !previouslyWrong) yield put(increaseSessionIncorrect());

    yield [
      put(correct ? copyCurrentToCompleted() : returnCurrentToQueue()),
      call(resetReview),
      put(cancelAutoAdvance()),
    ];
  }
}

// TODO: takeEvery(RECORD_ANSWER_ERROR)

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
    if (isKanji(answer) && answersContainTilde(readings)) {
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

export function* autoAdvance(wait) {
  while (true) {
    yield call(delay, wait);
    yield put(processAnswer());
  }
}

export function* autoAdvanceWatcher() {
  while (true) {
    const action = yield take(START_AUTO_ADVANCE);
    console.log(action);
    const wait = action.payload;
    yield race({
      task: call(autoAdvance, wait),
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

    const autoAdvanceCorrect = settings.get('autoAdvanceCorrect');
    const autoAdvanceDelay = settings.get('autoAdvanceDelay');
    const autoExpandCorrect = settings.get('autoExpandCorrect');
    const autoExpandIncorrect = settings.get('autoExpandIncorrect');
    const currentIncorrectCount = current.getIn(['session', 'incorrect']);
    const previouslyWrong = currentIncorrectCount >= 1;
    const firstTimeWrong = currentIncorrectCount === 1;

    if (correct) {
      if (!previouslyWrong) yield put(increaseCurrentStreak());
      if (autoExpandCorrect) yield put(toggleInfoPanels({ show: true }));
      if (autoAdvanceCorrect) yield put(startAutoAdvance(autoAdvanceDelay));
    }

    if (incorrect) {
      if (autoExpandIncorrect) yield put(toggleInfoPanels({ show: true }));
      if (firstTimeWrong) yield put(decreaseCurrentStreak());
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

    const [needMoreReviews, queueCompleted] = yield [
      select(selectIsReviewSyncNeeded()),
      select(selectIsQueueComplete()),
    ];

    if (needMoreReviews) {
      console.log('fetching more reviews...');
      yield put(loadReviewData(false));
      console.log('fetched more reviews!');
    }

    if (queueCompleted) {
      yield put(resetUserDataReviewCount());
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
