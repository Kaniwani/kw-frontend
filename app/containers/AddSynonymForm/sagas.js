import { takeEvery, put, call } from 'redux-saga/effects';
import { createSynonymUrl } from 'shared/urls';
import markAllAsDaemon from 'utils/markAllAsDaemon';
import post from 'utils/post';
import types from './constants';
import actions from './actions';
import reviewActions from 'containers/ReviewSession/actions';

export function* requestAddSynonym({ payload: { synonym } }) {
  const postUrl = createSynonymUrl();
  const postData = synonym.toJS();
  try {
    const { id } = yield call(post, postUrl, postData);
    const synonymWithId = synonym.set('id', id);
    yield put(reviewActions.addSynonymToCurrent(synonymWithId));
    yield put(actions.addSynonymSuccess(synonym, {
      title: 'Add Synonym',
      message: `Synonym “${synonym.character}” successfully added.`,
    }));
  } catch (err) {
    yield put(actions.addSynonymFailure({
      title: 'Connection error',
      message: `Unable to add synonym on server: ${err.message}`,
      error: err,
    }));
  }
}

export function* requestRemoveSynonym({ payload: { synonym } }) {
  const url = createSynonymUrl(synonym.id);
  try {
    yield call(post, url, null, { method: 'DELETE' });
    yield put(reviewActions.removeSynonymFromCurrent(synonym));
    yield put(actions.removeSynonymSuccess(synonym, {
      title: 'Remove Synonym',
      message: `Synonym “${synonym.character}” successfully removed.`,
    }));
  } catch (err) {
    yield put(actions.removeSynonymFailure({
      title: 'Connection error',
      message: `Unable to remove synonym “${synonym.character}” on server: ${err.message}`,
      error: err,
    }));
  }
}

export function* addSynonymRequestWatcher() {
  yield takeEvery(types.ADD.REQUEST, requestAddSynonym);
}
export function* removeSynonymRequestWatcher() {
  yield takeEvery(types.REMOVE.REQUEST, requestRemoveSynonym);
}

// Mark watchers to only run once on route entry
const watchers = markAllAsDaemon([
  addSynonymRequestWatcher,
  removeSynonymRequestWatcher,
]);

// Bootstrap sagas
export default [
  ...watchers,
];
