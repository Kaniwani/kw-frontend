import { combineReducers } from 'redux';
import { handleActions, combineActions } from 'redux-actions';
import merge from 'lodash/merge';
import difference from 'lodash/difference';
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
 *  Note: The items in the  array are actionslied sequentially, so the order matters.
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
 * { $actionsly: function }
 *   passes in the current value to the function and updates it with the new returned value.
*/

import session from 'containers/SessionRoutes/actions';
import app from './actions';

// TODO: get Tadgh to update settings with new options!
// NOTE: move defaults to serializer once api is updated to provide them
const settingsState = {
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
};

const userState = {
  profile: {},
  dashboard: {},
  settings: settingsState,
};

const entitiesState = {
  reviews: {},
  synonyms: {},
  vocabulary: {},
  readings: {},
  levels: {},
};

// FIXME: injected reducers for each route imo
const uiState = {
  error: false,
  user: {
    loading: false,
  },
  levels: {
    loading: false,
  },
  level: {
    loading: false,
    submitting: [],
  },
  entry: {
    loading: false,
  },
};

const uiReducer = handleActions({
  // TODO: can we simplify some of these to add a category to the action meta instead?
  [app.user.load.request]: (state) => ({ ...state,
    user: { loading: true },
  }),
  [combineActions(
    app.user.load.failure,
    app.user.load.cancel,
    app.user.load.success,
  )]: (state) => ({ ...state,
    user: { loading: false },
  }),
  [combineActions(
    app.user.load.failure,
  )]: (state, { payload }) => {
    // TODO: take all errors
    // TODO: log to slack
    console.warn('api failure'); // eslint-disable-line no-console
    console.error(payload); // eslint-disable-line no-console
    return {
      ...state, error: payload,
    };
  },
  [combineActions(
    app.level.lock.request,
    app.level.unlock.request,
  )]: (state, { payload }) => update(state, {
    levels: { submitting: { $push: [payload.id] } },
  }),
}, uiState);

const userReducer = handleActions({
  [app.user.load.success]: (state, { payload }) => update(state, {
    $set: merge({}, state, payload),
  }),
}, userState);

const entitiesReducer = handleActions({
  [combineActions(
    app.review.load.success,
    app.reviews.load.success,
    session.queue.load.success,
    app.level.load.success,
    app.levels.load.success,
  )]: (state, { payload }) => update(state, {
    entities: { $set: merge({}, state.entities, payload.entities) },
  }),
  [app.level.lock.success]: (state, { payload }) => update(state, {
    entities: { levels: { [payload.id]: { isLocked: { $set: true } } } },
  }),
  [app.level.unlock.success]: (state, { payload }) => update(state, {
    entities: { levels: { [payload.id]: { isLocked: { $set: false } } } },
  }),
  [combineActions(
    app.review.lock.success,
    app.review.unlock.success,
  )]: (state, { payload }) => update(state, {
    entities: { reviews: { [payload.id]: { isHidden: { $set: payload.isHidden } } } },
  }),
  [app.synonym.add.success]: (state, { payload }) => update(state, {
    entities: {
      reviews: { [payload.reviewId]: { synonyms: { $push: [payload.id] } } },
      synonyms: { [payload.id]: { $set: payload } } },
  }),
  [app.synonym.remove.success]: (state, { payload }) => update(state, {
    entities: {
      reviews: { [payload.reviewId]: { synonyms: { $apply: (synonyms) => difference(synonyms, [payload.id]) } } },
      synonyms: { $unset: [payload.id] },
    },
  }),
}, entitiesState);

export default combineReducers({
  ui: uiReducer,
  user: userReducer,
  entities: entitiesReducer,
});
