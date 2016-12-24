import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import markAllAsDaemon from 'utils/markAllAsDaemon';
import request from 'utils/request';

import shapeJishoData from './utils/shapeJishoData';

import {
  LOAD_JISHODATA,
} from './constants';

import {
  jishoDataLoaded,
  jishoDataLoadingError,
} from './actions';

export function* getJishoData({ payload }) {
  const requestURL = `http://jisho.org/api/v1/search/words?keyword=${payload}`;
  const requestOptions = { mode: 'no-cors' };
  try {
    const data = yield call(request, requestURL, requestOptions);
    const shapedData = shapeJishoData(data);
    yield put(jishoDataLoaded(shapedData));
  } catch (err) {
    yield put(jishoDataLoadingError(err));
  }
}

export function* getJishoDataWatcher() {
  yield takeLatest(LOAD_JISHODATA, getJishoData);
}

// Mark watchers to only run once on route entry
const watchers = markAllAsDaemon([getJishoDataWatcher]);

// Bootstrap sagas
export default [
  ...watchers,
];
