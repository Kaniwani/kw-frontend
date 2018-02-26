import { handleActions, combineActions } from 'redux-actions';
import { merge } from 'lodash';
import { LOCATION_CHANGE } from 'react-router-redux';

import search from './actions';

export const initialSearchState = {
  ids: [],
  unreviewableIds: [],
  resultCount: 0,
  isSearching: false,
  isSearchComplete: false,
};

// FIXME: proper failure handling
const log = (state, action) => {
  console.warn('search failure', state, action);
  return state;
};

const startSearch = () => ({ ...initialSearchState, isSearching: true });
const mergePayload = (state, { payload }) => merge({}, state, payload);
const resetState = () => initialSearchState;

export const searchReducer = handleActions(
  {
    [search.query.request]: startSearch,
    [search.query.success]: mergePayload,
    [search.query.failure]: log,
    [combineActions(search.clear, LOCATION_CHANGE)]: resetState,
  },
  initialSearchState
);

export default searchReducer;
