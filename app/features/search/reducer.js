import { handleActions, combineActions } from 'redux-actions';
import { merge } from 'lodash';
import { LOCATION_CHANGE } from 'react-router-redux';

import search from './actions';

export const initialSearchState = {
  ids: [],
  isSearching: false,
  isSearchComplete: false,
};

const startSearch = () => ({ ...initialSearchState, isSearching: true });
const mergePayload = (state, { payload }) => merge({}, state, payload);
const resetState = () => initialSearchState;

export const searchReducer = handleActions(
  {
    [search.query.request]: startSearch,
    [search.query.success]: mergePayload,
    [combineActions(search.clear, LOCATION_CHANGE)]: resetState,
  },
  initialSearchState
);

export default searchReducer;
