import { takeEvery, put, call } from 'redux-saga/effects';
import * as api from 'shared/api';
import markAllAsDaemon from 'utils/markAllAsDaemon';
import types from './constants';
import actions from './actions';
import reviewActions from 'containers/ReviewSession/actions';

export function* requestAddSynonym({ payload: { synonym } }) {
  const body = synonym.toJS();
  try {
    const { id } = yield call(api.addSynonym, body);
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
  try {
    yield call(api.removeSynonym, { id: synonym.id });
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
