import { delay } from 'redux-saga';
import { take, takeEvery, select, call, fork, put, race } from 'redux-saga/effects';
import { history } from 'app';
import isEmpty from 'lodash/isEmpty';
import markAllAsDaemon from 'utils/markAllAsDaemon';
import addSynonymSagas from 'containers/AddSynonymForm/sagas';
import * as api from 'shared/api';
import { getTildePosition, fixStartingTilde, fixEndingTilde, fixTerminalN } from './utils';
import { isHiragana, isKatakana, isKanjiKana } from 'kanawana';
import types from './constants';
import globalTypes from 'containers/App/constants';
import synonymFormTypes from 'containers/AddSynonymForm/constants';
import globalActions from 'containers/App/actions';
import actions from './actions';
import * as selectors from './selectors';
import { selectUserSettings } from 'containers/App/selectors';


/* eslint-disable no-constant-condition */
// NOTE: this is different to the watcher in app saga
// that one handles loading the data, this one starts the quiz
export function* loadReviewsSuccessWatcher() {
  while (true) {
    yield take(globalTypes.REVIEWS.LOAD.SUCCESS);
    const [current, queueCount] = yield [
      select(selectors.selectCurrent),
      select(selectors.selectQueueCount),
    ];
    const noCurrentReview = current == null;
    if (queueCount && noCurrentReview) {
      yield put(actions.setNewCurrent());
    }
  }
}

export function* recordAnswerRequest() {
  const [id, correct, firstTimeIncorrect, previouslyIncorrect] = yield [
    select(selectors.selectCurrentId),
    select(selectors.selectCurrentIsCorrect),
    select(selectors.selectCurrentIsFirsTimeIncorrect),
    select(selectors.selectCurrentIsPreviouslyIncorrect),
  ];


  try {
    if (correct || (!correct && firstTimeIncorrect)) {
      const body = {
        id,
        user_specific_id: id,
        user_correct: correct,
        wrong_before: previouslyIncorrect,
      };
      yield fork(correct ? api.reviewCorrect : api.reviewIncorrect, body);
    }
  } catch (err) {
    // TODO: catch errors and notify user answer not recorded - halt session with "refresh?"
    yield put(actions.recordAnswerFailure({
      title: 'Connection Error',
      message: `Unable to record
      answer: ${err.message}`,
      error: err,
    }));
  } finally {
    if (correct && !previouslyIncorrect) {
      yield [
        put(actions.increaseCurrentCorrect()),
        put(actions.addCurrentToCorrect()),
      ];
    }
    if (!correct && !previouslyIncorrect) {
      yield [
        put(actions.increaseCurrentIncorrect()),
        put(actions.addCurrentToIncorrect()),
      ];
    }
    yield [
      put(correct ? actions.addCurrentToComplete() : actions.addCurrentToQueue()),
      call(resetReview),
      put(actions.cancelAutoAdvance()),
    ];
  }
}

/**
 * Hides vocab info, sets new current question, and resets answer input
 */
export function* resetReview() {
  const { infoDetailLevel } = yield select(selectUserSettings);
  yield [
    put(actions.updatePanels({ info: { detail: infoDetailLevel } })),
    put(actions.hidePanels()),
    put(actions.resetAnswer()),
    put(actions.setNewCurrent()),
  ];
}

export function* checkAnswer() {
  let [current, input] = yield [ // eslint-disable-line prefer-const
    select(selectors.selectCurrent),
    select(selectors.selectAnswerInput),
  ];
  const { readings, synonyms } = current.vocabulary;
  const possibleAnswers = readings.concat(synonyms);

  let answer = input.trim();
  const hasContent = !isEmpty(answer);

  if (hasContent) {
    answer = fixTerminalN(answer);
    const tildePosition = getTildePosition(readings);
    if (tildePosition) {
      if (tildePosition === 'start') answer = fixStartingTilde(answer);
      if (tildePosition === 'end') answer = fixEndingTilde(answer);
    }
  }
  const allJapanese = isKanjiKana(answer);
  const type = (hasContent && (isHiragana(answer) || isKatakana(answer) ? 'kana' : 'kanji')) || '';
  const valid = hasContent && allJapanese;
  const matches = possibleAnswers.some((vocabulary) => vocabulary.includes(answer));
  const correct = valid && matches;
  const incorrect = valid && !matches;

  yield put(actions.updateAnswer({
    input: valid ? answer : input,
    marked: true,
    type,
    valid,
  }));
  if (correct) yield put(actions.markCorrect({ correct, marked: true, disabled: true }));
  if (incorrect) yield put(actions.markIncorrect({ incorrect, marked: true, disabled: true }));
}

export function* autoAdvance(wait) {
  while (true) {
    yield call(delay, wait);
    yield put(actions.recordAnswerRequest());
  }
}

export function* autoAdvanceWatcher() {
  while (true) {
    const action = yield take(types.AUTO_ADVANCE.START);
    const wait = action.payload.delay;
    yield race({
      task: call(autoAdvance, wait),
      cancel: take(types.AUTO_ADVANCE.CANCEL),
    });
  }
}

export function* recordAnswerRequestWatcher() {
  yield takeEvery(types.ANSWER.RECORD.REQUEST, recordAnswerRequest);
}

export function* checkAnswerWatcher() {
  yield takeEvery(types.ANSWER.CHECK, checkAnswer);
}

export function* markAnswerWatcher() {
  while (true) {
    const { correct, incorrect, ignored } = yield race({
      correct: take(types.ANSWER.MARK.CORRECT),
      incorrect: take(types.ANSWER.MARK.INCORRECT),
      ignored: take(types.ANSWER.MARK.IGNORED),
    });

    const [settings, firstTimeIncorrect, previouslyIncorrect] = yield [
      select(selectUserSettings),
      select(selectors.selectCurrentIsFirsTimeIncorrect),
      select(selectors.selectCurrentIsPreviouslyIncorrect),
    ];

    const {
      autoAdvanceDelay,
      autoExpandCorrect,
      autoExpandIncorrect,
      autoAdvanceCorrect,
    } = settings;

    if (correct) {
      if (!previouslyIncorrect) {
        yield [
          put(actions.increaseCurrentStreak()),
          put(actions.increaseCurrentCorrect()),
        ];
      }
      if (autoExpandCorrect) yield put(actions.showPanel('info'));
      if (autoAdvanceCorrect) yield put(actions.startAutoAdvance(autoAdvanceDelay));
    }
    if (incorrect) {
      if (firstTimeIncorrect) {
        yield [
          put(actions.decreaseCurrentStreak()),
          put(actions.increaseCurrentIncorrect()),
        ];
      }
      if (autoExpandIncorrect) yield put(actions.showPanel('info'));
    }

    if (ignored) {
      yield [
        put(actions.cancelAutoAdvance()),
        put(actions.revertCurrentStreak()),
        put(actions.addCurrentToQueue()),
        put(ignored.payload.correct ?
          actions.decreaseCurrentCorrect() :
          actions.decreaseCurrentIncorrect(),
        ),
        call(resetReview),
      ];
    }
  }
}

export function* addCurrentToCompleteWatcher() {
  while (true) {
    yield take(types.CURRENT.ADD_TO.COMPLETE);

    const [needMoreReviews, queueComplete] = yield [
      select(selectors.selectIsReviewSyncNeeded),
      select(selectors.selectIsQueueComplete),
    ];

    if (needMoreReviews) {
      yield put(globalActions.loadReviews(false));
    }

    if (queueComplete) {
      // TODO: might need to reset user profile reviews count now
      yield history.push('/review/summary');
    }
  }
}

export function* addSynonymWatcher() {
  yield takeEvery(synonymFormTypes.ADD.SUCCESS, addSynonym);
}

function* addSynonym() {
  yield put(actions.markIgnored(false));
}

const watchers = markAllAsDaemon([
  addSynonymWatcher,
  checkAnswerWatcher,
  loadReviewsSuccessWatcher,
  markAnswerWatcher,
  recordAnswerRequestWatcher,
  autoAdvanceWatcher,
  addCurrentToCompleteWatcher,
]);

export default [
  ...watchers,
  ...addSynonymSagas,
];
