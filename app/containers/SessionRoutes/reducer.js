import { handleActions } from 'redux-actions';
import update from 'immutability-helper';
import union from 'lodash/union';
import actions from './actions';

const initialState = {
  loading: false,
  error: false,
  current: false,
  queue: [],
  complete: [],
  correct: [],
  incorrect: [],
  critical: [],
};

// FIXME: queue load should not set current
// it should have meta info for the logic that handles queue load to decide whether to dispatch a set current action
//
// FIXME: loading and error to global UI state
const sessionReducer = handleActions({
  [actions.queue.load.request]: (state) => ({ ...state, loading: true }),
  [actions.queue.load.success]: (state, { payload }) => update(state, {
    // current: { $set: payload.result.shift() },
    queue: { $set: union(state.queue, payload.result) },
    loading: { $set: false },
  }),
  [actions.queue.load.failure]: (state, { payload }) => ({ ...state, error: payload, loading: false }),
  [actions.queue.load.cancel]: (state) => ({ ...state, loading: false }),
}, initialState);

export default sessionReducer;
