import { handleActions } from 'redux-actions';
import merge from 'lodash/merge';

import { TYPES } from './actions';
const { USER, REVIEWS, LEVELS } = TYPES;

const initialState = {
  loading: false,
  error: false,
  user: {},
  dashboard: {},
  settings: {},
  entities: {
    reviews: [],
    vocabulary: [],
    readings: [],
    levels: [],
  },
};

const appReducer = handleActions({
  [USER.LOAD]: (state) => ({ ...state, loading: true }),
  [USER.SUCCESS]: (state, { payload }) => ({ ...state, ...payload, loading: false }),
  [USER.FAILURE]: (state, { payload, error }) => {
    console.error('user error', payload, error);
    return { ...state, error: payload, loading: false };
  },
  [USER.CANCEL]: (state) => ({ ...state, loading: false }),
  [REVIEWS.LOAD]: (state) => ({ ...state, loading: true }),
  [REVIEWS.SUCCESS]: (state, { payload }) => ({
    ...state,
    entities: merge(state.entities, payload.entities),
    queue: payload.queue,
    loading: false,
  }),
  [REVIEWS.FAILURE]: (state, { payload, error }) => {
    console.error('reviews error', payload, error);
    return { ...state, error: payload, loading: false };
  },
  [REVIEWS.CANCEL]: (state) => ({ ...state, loading: false }),
  [LEVELS.LOAD]: (state) => ({ ...state, loading: true }),
  [LEVELS.SUCCESS]: (state, { payload }) => ({
    ...state,
    entities: merge(state.entities, payload.entities),
    levels: merge(state.levels, [payload.level]),
    loading: false,
  }),
  [LEVELS.FAILURE]: (state, { payload, error }) => {
    console.error('levels error', payload, error);
    return { ...state, error: payload, loading: false };
  },
  [LEVELS.CANCEL]: (state) => ({ ...state, loading: false }),
}, initialState);

export default appReducer;
