import { handleActions, combineActions } from 'redux-actions';
import update from 'immutability-helper';
import difference from 'lodash/difference';

import app from 'containers/App/actions';

const initialState = {
  loading: [],
};

const VocabLevelsReducer = handleActions({
  [combineActions(
    app.level.load.request,
  )]: (state, { payload }) => update(state, {
    loading: { $push: [payload.id] },
  }),
  [combineActions(
    app.level.load.success,
  )]: (state, { payload }) => update(state, {
    loading: { $apply: (ids) => difference(ids, [payload.id]) },
  }),
}, initialState);

export default VocabLevelsReducer;
