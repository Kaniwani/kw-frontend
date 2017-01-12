import { takeEvery, put, call, select } from 'redux-saga/effects';
import { createSynonymUrl } from 'shared/urls';
import markAllAsDaemon from 'utils/markAllAsDaemon';
import post from 'utils/post';
// import request from 'utils/request';
// import { createJishoUrl } from 'shared/urls';
// import shapeJishoData from './utils/shapeJishoData';
// import { LOAD_JISHODATA } from './constants';
import { ADD_SYNONYM, REMOVE_SYNONYM } from './constants';

import { addSynonymToCurrent, removeSynonymFromCurrent } from 'containers/ReviewSession/actions';
import { selectCurrent } from 'containers/ReviewSession/selectors';
import { checkAnswer } from 'containers/ReviewAnswer/actions';

import {
  addSynonymError,
  addSynonymSuccess,
  removeSynonymError,
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
  const postUrl = createSynonymUrl();
  const postData = {
    review: current.get('id'),
    ...synonym,
  };

  try {
    const synonymData = yield call(post, postUrl, postData);
    yield put(addSynonymSuccess({
      title: 'Add Synonym',
      message: `Synonym “${synonymData.character}” successfully added.`,
    }));
    yield put(addSynonymToCurrent(synonymData));
    yield put(checkAnswer());
  } catch (err) {
    console.error(err);
    yield put(addSynonymError({
      title: 'Connection error',
      message: `Unable to add synonym on server: ${err.message}`,
    }));
  }
}

// TODO: not really relevant to synonymForm at all
// move to app level since vocab will use it?
// same goes for addSynonym really
export function* removeSynonym({ payload }) {
  const id = payload;
  const url = createSynonymUrl(id);

  try {
    yield call(post, url, null, { method: 'DELETE' });
    yield put(removeSynonymFromCurrent(id));
  } catch (err) {
    console.error(err);
    yield put(removeSynonymError({
      title: 'Connection error',
      message: `Unable to remove synonym on server: ${err.message}`,
    }));
  }
}


// export function* getJishoDataWatcher() {
//   yield takeLatest(LOAD_JISHODATA, getJishoData);
// }

export function* addSynonymWatcher() {
  yield takeEvery(ADD_SYNONYM, postNewSynonym);
}
export function* removeSynonymWatcher() {
  yield takeEvery(REMOVE_SYNONYM, removeSynonym);
}

// Mark watchers to only run once on route entry
const watchers = markAllAsDaemon([
  addSynonymWatcher,
  removeSynonymWatcher,
/* getJishoDataWatcher, */
]);

// Bootstrap sagas
export default [
  ...watchers,
];
