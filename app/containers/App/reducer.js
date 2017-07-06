import { handleActions, combineActions } from 'redux-actions';
import union from 'lodash/union';
import merge from 'lodash/merge';
import update from 'immutability-helper';
/*
 * { $push: array }
 *   push() all the items in array on the target.
 *
 * { $unshift: array }
 *   unshift() all the items in array on the target.
 *
 * { $splice: array of arrays }
 *  for each item in arrays call splice() on the target with the parameters provided by the item.
 *  Note: The items in the  array are applied sequentially, so the order matters.
 *  The indices of the target may change during the operation.
 *
 * { $set: any }
 *   replace the target entirely.
 *
 * { $unset: array of strings}
 * remove the list of keys in array from the target object.
 *
 * { $merge: object }
 *   shallow merge the keys of object with the target.
 *
 * { $apply: function }
 *   passes in the current value to the function and updates it with the new returned value.
*/

import { TYPES } from './actions';
const { USER, REVIEWS, QUEUE, REVIEW, LEVEL, LEVELS } = TYPES;

const initialState = {
  loading: false,
  error: false,
  user: {},
  dashboard: {},
  /* TODO: get Tadgh to update settings with new options! */
  settings: {
    quiz: {
      detail: 0, // 0-2
      autoAdvance: {
        active: false,
        speed: 2000,
      },
    },
    kanjiStroke: {
      autoplay: true,
      step: 0.01,
      stroke: { order: { visible: false } },
      grid: { show: true },
    },
  },
  queue: [], // todo: store in reviewsPage/lessonsPage slice reducer
  entities: {
    reviews: {},
    vocabulary: {},
    readings: {},
    levels: {},
  },
};

const appReducer = handleActions({
  [combineActions(
    USER.LOAD.REQUEST,
    REVIEWS.LOAD.REQUEST,
    QUEUE.LOAD.REQUEST,
    REVIEW.LOAD.REQUEST,
    LEVELS.LOAD.REQUEST,
    LEVEL.LOAD.REQUEST,
  )]: (state) => update(state, { $merge: { loading: true } }),
  [combineActions(
    USER.LOAD.SUCCESS,
    REVIEWS.LOAD.SUCCESS,
    QUEUE.LOAD.SUCCESS,
    REVIEW.LOAD.SUCCESS,
    LEVELS.LOAD.SUCCESS,
    LEVEL.LOAD.SUCCESS,
    USER.LOAD.CANCEL,
    REVIEWS.LOAD.CANCEL,
    QUEUE.LOAD.CANCEL,
    REVIEW.LOAD.CANCEL,
    LEVELS.LOAD.CANCEL,
    LEVEL.LOAD.CANCEL,
  )]: (state) => update(state, { $merge: { loading: false } }),
  [combineActions(
    USER.LOAD.FAILURE,
    REVIEWS.LOAD.FAILURE,
    QUEUE.LOAD.FAILURE,
    REVIEW.LOAD.FAILURE,
    LEVELS.LOAD.FAILURE,
    LEVEL.LOAD.FAILURE,
  )]: (state, { payload, error }) => {
    // TODO: log to slack
    console.warn('api error', error); // eslint-disable-line no-console
    console.error(payload); // eslint-disable-line no-console
    return update(state, { $merge: { error: payload, loading: false } });
  },
  [USER.LOAD.SUCCESS]: (state, { payload }) => update(state, {
    $set: merge({}, state, payload),
  }),
  [REVIEWS.LOAD.SUCCESS]: (state, { payload }) => {
    console.log('REVIEWS.LOAD.SUCCESS', payload);
    return update(state, {
      entities: {
        levels: { [payload.level]: { $set: merge({}, state.entities.levels[payload.level], { ids: payload.result }) } },
        vocabulary: { $set: merge({}, state.entities.vocabulary, payload.entities.vocabulary) },
        readings: { $set: merge({}, state.entities.readings, payload.entities.readings) },
        reviews: { $set: merge({}, state.entities.reviews, payload.entities.reviews) },
      },
    });
  },
  [QUEUE.LOAD.SUCCESS]: (state, { payload }) => {
    console.log('QUEUE.LOAD.SUCCESS', payload);
    return update(state, {
      entities: { $set: merge({}, state.entities, payload.entities) },
      queue: { $set: union(state.queue, payload.result) },
    });
  },
  [REVIEW.LOAD.SUCCESS]: (state, { payload }) => {
    console.log('REVIEW.LOAD.SUCCESS', payload);
    return update(state, {
      entities: { $set: merge({}, state.entities, payload.entities) },
    });
  },
  [LEVELS.LOAD.SUCCESS]: (state, { payload }) => update(state, {
    entities: { levels: { $set: merge({}, state.entities.levels, payload) } },
  }),
  [LEVEL.LOCK.SUCCESS]: (state, { payload }) => update(state, {
    entities: { levels: { [payload.level]: { locked: { $set: true } } } },
  }),
  [LEVEL.UNLOCK.SUCCESS]: (state, { payload }) => update(state, {
    entities: { levels: { [payload.level]: { locked: { $set: false } } } },
  }),
  [LEVEL.LOAD.SUCCESS]: (state, { payload }) => {
    console.log('LEVEL.LOAD.SUCCESS', payload);
    return update(state, {
      entities: {
        levels: { [payload.level]: { $set: merge({}, state.entities.levels[payload.level], { ids: payload.result }) } },
        vocabulary: { $set: merge({}, state.entities.vocabulary, payload.entities.vocabulary) },
        readings: { $set: merge({}, state.entities.readings, payload.entities.readings) },
      },
    });
  },
}, initialState);

export default appReducer;
