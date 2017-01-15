import { takeEvery, call, put } from 'redux-saga/effects';
import markAllAsDaemon from 'utils/markAllAsDaemon';
import { createLevelUrl, createReviewUrl } from 'shared/urls';
import { vocabularyLevelSerializer, reviewEntriesSerializer, reviewEntrySerializer } from 'shared/serializers';
import request from 'utils/request';

import * as CONSTANTS from './constants';
import * as ACTIONS from './actions';

export function* getVocabLevels() {
  const requestURL = createLevelUrl();
  try {
    const data = yield call(request, requestURL);
    const shapedData = vocabularyLevelSerializer(data);
    yield put(ACTIONS.levelsLoaded(shapedData));
  } catch (err) {
    yield put(ACTIONS.levelsLoadingError(err));
  }
}

export function* getVocabItems({ payload }) {
  const level = payload;
  const requestURL = `${createReviewUrl()}?limit=150&level=${level}`;
  try {
    const data = yield call(request, requestURL);
    const shapedData = reviewEntriesSerializer(data);
    yield put(ACTIONS.itemsLoaded(shapedData));
  } catch (err) {
    yield put(ACTIONS.itemsLoadingError(err));
  }
}

export function* getVocabItem({ payload }) {
  const itemId = payload;
  // TODO: try selecting item from items using ID.
  // if that fails, then request for item from server
  const requestURL = createReviewUrl(itemId);
  try {
    const data = yield call(request, requestURL);
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
