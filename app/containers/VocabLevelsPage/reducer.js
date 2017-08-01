import { handleActions, combineActions } from 'redux-actions';
import update from 'immutability-helper';
import difference from 'lodash/difference';

import app from 'containers/App/actions';

const initialState = {
  submitting: [],
};

const VocabLevelsReducer = handleActions({
  [combineActions(
    app.level.lock.request,
    app.level.unlock.request,
  )]: (state, { payload }) => update(state, {
    submitting: { $push: [payload.id] },
  }),
  [combineActions(
    app.level.lock.success,
    app.level.unlock.success,
  )]: (state, { payload }) => update(state, {
    submitting: { $apply: (ids) => difference(ids, [payload.id]) },
  }),
}, initialState);

export default VocabLevelsReducer;
