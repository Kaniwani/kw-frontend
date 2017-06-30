import { handleActions, combineActions } from 'redux-actions';
import update from 'immutability-helper';
import union from 'lodash/union';
import merge from 'lodash/merge';

import { TYPES } from './actions';
const { USER, REVIEWS, QUEUE, REVIEW, LEVEL, LEVELS } = TYPES;

const initialState = {
  loading: false,
  error: false,
  user: {},
  dashboard: {},
  settings: {},
  entities: {
    reviews: {},
    vocabulary: {},
    readings: {},
    levels: {},
  },
  queue: [],
};

const appReducer = handleActions({
  [combineActions(
    USER.LOAD,
    REVIEWS.LOAD,
    QUEUE.LOAD,
    REVIEW.LOAD,
    LEVELS.LOAD,
    LEVEL.LOAD,
  )]: (state) => ({ ...state, loading: true }),
  [combineActions(
    USER.SUCCESS,
    REVIEWS.SUCCESS,
    QUEUE.SUCCESS,
    REVIEW.SUCCESS,
    LEVELS.SUCCESS,
    LEVEL.SUCCESS,
    USER.CANCEL,
    REVIEWS.CANCEL,
    QUEUE.CANCEL,
    REVIEW.CANCEL,
    LEVELS.CANCEL,
    LEVEL.CANCEL,
  )]: (state) => ({ ...state, loading: false }),
  [combineActions(
    USER.FAILURE,
    REVIEWS.FAILURE,
    QUEUE.FAILURE,
    REVIEW.FAILURE,
    LEVELS.FAILURE,
    LEVEL.FAILURE,
  )]: (state, { payload, error }) => {
    // TODO: log to slack
    console.warn('api error', error); // eslint-disable-line no-console
    console.error(payload); // eslint-disable-line no-console
    return { ...state, error: payload, loading: false };
  },
  [USER.SUCCESS]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
  [REVIEWS.SUCCESS]: (state, { payload }) => {
    console.log('revs!', payload);
    return update(state, {
      entities: {
        levels: { [payload.level]: { $set: merge({}, state.entities.levels[payload.level], { ids: payload.result }) } },
        vocabulary: { $set: merge({}, state.entities.vocabulary, payload.entities.vocabulary) },
        readings: { $set: merge({}, state.entities.readings, payload.entities.readings) },
        reviews: { $set: merge({}, state.entities.reviews, payload.entities.reviews) },
      },
    });
  },
  [QUEUE.SUCCESS]: (state, { payload }) => {
    console.log('queue', payload);
    return update(state, {
      entities: { $set: merge({}, state.entities, payload.entities) },
      queue: { $set: union(state.queue, payload.result) },
    });
  },
  [REVIEW.SUCCESS]: (state, { payload }) => {
    console.log('rev', payload);
    return update(state, {
      entities: { $set: merge({}, state.entities, payload.entities) },
    });
  },
  [LEVELS.SUCCESS]: (state, { payload }) => update(state, {
    entities: { levels: { $set: merge({}, state.entities.levels, payload) } },
  }),
  [LEVEL.SUCCESS]: (state, { payload }) => update(state, {
    entities: {
      levels: { [payload.level]: { $set: merge({}, state.entities.levels[payload.level], { ids: payload.result }) } },
      vocabulary: { $set: merge({}, state.entities.vocabulary, payload.entities.vocabulary) },
      readings: { $set: merge({}, state.entities.readings, payload.entities.readings) },
    },
  }),
}, initialState);

export default appReducer;
