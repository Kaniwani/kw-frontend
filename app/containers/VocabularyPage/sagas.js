import { takeEvery, call, put } from 'redux-saga/effects';
import markAllAsDaemon from 'utils/markAllAsDaemon';
import * as api from 'shared/api';
import { vocabularyLevelSerializer, reviewEntriesSerializer, reviewEntrySerializer } from 'shared/serializers';

import * as CONSTANTS from './constants';
import * as ACTIONS from './actions';

export function* getVocabLevels() {
  try {
    const data = yield call(api.getLevels);
    const shapedData = vocabularyLevelSerializer(data);
    yield put(ACTIONS.levelsLoaded(shapedData));
  } catch (err) {
    yield put(ACTIONS.levelsLoadingError(err));
  }
}

export function* getVocabItems({ payload: { level } }) {
  try {
    const data = yield call(api.getLevelEntry, { level });
    const shapedData = reviewEntriesSerializer(data);
    yield put(ACTIONS.itemsLoaded(shapedData));
  } catch (err) {
    yield put(ACTIONS.itemsLoadingError(err));
  }
}

export function* getVocabItem({ payload: { id } }) {
  // TODO: try selecting item from persisted reviews using ID.
  // if that fails, then request for item from server
  try {
    const data = yield call(api.getReviewEntry, { id });
    const shapedData = reviewEntrySerializer(data);
    yield put(ACTIONS.itemLoaded(shapedData));
  } catch (err) {
    yield put(ACTIONS.itemLoadingError(err));
  }
}

export function* getVocabLevelsWatcher() {
  yield takeEvery(CONSTANTS.LOAD_LEVELS, getVocabLevels);
}
export function* getVocabItemsWatcher() {
  yield takeEvery(CONSTANTS.LOAD_ITEMS, getVocabItems);
}
export function* getVocabItemWatcher() {
  yield takeEvery(CONSTANTS.LOAD_ITEM, getVocabItem);
}

const watchers = markAllAsDaemon([
  getVocabLevelsWatcher,
  getVocabItemsWatcher,
  getVocabItemWatcher,
]);

export default [
  ...watchers,
];
