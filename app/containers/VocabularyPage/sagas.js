import { takeEvery, call, put } from 'redux-saga/effects';
import markAllAsDaemon from 'utils/markAllAsDaemon';
import { createLevelUrl } from 'shared/urls';
import shapeVocabularyLevelsData from './utils/shapeVocabularyLevelsData';
import request from 'utils/request';

import {
  LOAD_VOCAB_LEVELDATA,
} from './constants';

import {
  vocabularyLevelsDataLoaded,
  vocabularyLevelsDataLoadingError,
} from './actions';

export function* getVocabLevelsData() {
  const requestURL = createLevelUrl();
  try {
    const data = yield call(request, requestURL);
    const shapedData = shapeVocabularyLevelsData(data);
    yield put(vocabularyLevelsDataLoaded(shapedData));
  } catch (err) {
    yield put(vocabularyLevelsDataLoadingError(err));
  }
}

export function* getVocabLevelsDataWatcher() {
  yield takeEvery(LOAD_VOCAB_LEVELDATA, getVocabLevelsData);
}

const watchers = markAllAsDaemon([
  getVocabLevelsDataWatcher,
]);

export default [
  ...watchers,
];
