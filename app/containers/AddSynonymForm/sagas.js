import { takeLatest } from 'redux-saga';
import { put, fork } from 'redux-saga/effects';
import markAllAsDaemon from 'utils/markAllAsDaemon';
// import request from 'utils/request';
import post from 'utils/post';

// import shapeJishoData from './utils/shapeJishoData';

import {
  // LOAD_JISHODATA,
  ADD_SYNONYM,
} from './constants';

import {
  // jishoDataLoaded,
  // jishoDataLoadingError,
  addSynonymSuccess,
  addSynonymError,
} from './actions';

// export function* getJishoData({ payload }) {
//   const requestURL = `http://jisho.org/api/v1/search/words?keyword=${payload}`;
//   const requestOptions = { mode: 'no-cors' };
//   try {
//     const data = yield call(request, requestURL, requestOptions);
//     const shapedData = shapeJishoData(data);
//     yield put(jishoDataLoaded(shapedData));
//   } catch (err) {
//     yield put(jishoDataLoadingError(err));
//   }
// }

export function* postNewSynonym({ payload }) {
  const postUrl = '/api/v1'; // TODO: update url
  try {
    yield fork(post, postUrl, payload);
    yield put(addSynonymSuccess());
  } catch (err) {
    yield put(addSynonymError(err)); // TODO: use toasts for api errors
  } finally {
    // TODO: add synonym to current, ignore current
  }
}

// export function* getJishoDataWatcher() {
//   yield takeLatest(LOAD_JISHODATA, getJishoData);
// }

export function* addSynonymWatcher() {
  yield takeLatest(ADD_SYNONYM, postNewSynonym);
}

// Mark watchers to only run once on route entry
const watchers = markAllAsDaemon([
  addSynonymWatcher,
/* getJishoDataWatcher, */
]);

// Bootstrap sagas
export default [
  ...watchers,
];
