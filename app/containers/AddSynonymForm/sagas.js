import { takeLatest, put, fork, select } from 'redux-saga/effects';
import { createSynonymUrl } from 'shared/urls';
import markAllAsDaemon from 'utils/markAllAsDaemon';
import post from 'utils/post';
// import request from 'utils/request';
// import { createJishoUrl } from 'shared/urls';
// import shapeJishoData from './utils/shapeJishoData';
// import { LOAD_JISHODATA } from './constants';
import { ADD_SYNONYM } from './constants';

import { addSynonymToCurrent } from 'containers/ReviewSession/actions';
import { selectCurrent } from 'containers/ReviewSession/selectors';
import { markIgnored } from 'containers/ReviewAnswer/actions';

import {
  addSynonymError,
  // jishoDataLoaded,
  // jishoDataLoadingError,
} from './actions';

// export function* getJishoData({ payload }) {
//   const requestURL = createJishoUrl(payload);
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
  const current = yield select(selectCurrent());
  const synonym = {
    character: payload.get('Kanji'),
    kana: payload.get('Kana'),
  };
  const postData = { id: current.get('id'), ...synonym };
  const postUrl = createSynonymUrl();

  try {
    yield fork(post, postUrl, postData);
  } catch (err) {
    yield put(addSynonymError(err)); // TODO: use toasts for api errors
  } finally {
    yield [
      put(addSynonymToCurrent(synonym)),
      put(markIgnored(true)),
    ];
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
