import { handleActions, combineActions } from 'redux-actions';
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
import levels from 'containers/VocabLevelsPage/actions';
import app from './actions';

const initialState = {
  // FIXME: loading should be handled by relevant containers
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
  entities: {
    reviews: {},
    vocabulary: {},
    readings: {},
    levels: {},
  },
};

// FIXME: loading true/false should be handled by relevant containers
const appReducer = handleActions({
  [app.user.load.request]: (state) => update(state, { $merge: { loading: true } }),
  [app.user.load.cancel]: (state) => update(state, { $merge: { loading: false } }),
  [app.user.load.failure]: (state, { payload, error }) => {
    // TODO: log to slack
    console.warn('api error', error); // eslint-disable-line no-console
    console.error(payload); // eslint-disable-line no-console
    return update(state, { $merge: { error: payload, loading: false } });
  },
  [app.user.load.success]: (state, { payload }) => update(state, {
    $set: merge({}, state, payload, { loading: false }),
  }),
  [app.reviews.load.success]: (state, { payload }) => update(state, {
    entities: {
      reviews: { $set: merge({}, state.entities.reviews, payload.entities.reviews) },
      vocabulary: { $set: merge({}, state.entities.vocabulary, payload.entities.vocabulary) },
      readings: { $set: merge({}, state.entities.readings, payload.entities.readings) },
      // levels: { [payload.level]: { $set: merge({}, state.entities.levels[payload.level], { ids: payload.result }) } },
    },
  }),
  [combineActions(
    session.queue.load.success,
    app.review.load.success,
    app.level.load.success,
    levels.load.success,
  )]: (state, { payload }) => update(state, {
    entities: { $set: merge({}, state.entities, payload.entities) },
  }),
  [app.level.load.success]: (state, { payload }) => update(state, {
    entities: { $set: merge({}, state.entities, payload.entities) },
  }),
  [combineActions(
    levels.locklevel.request,
    levels.unlocklevel.request,
  )]: (state, { payload }) => update(state, {
    entities: { levels: { [payload.id]: { isSubmitting: { $set: true } } } },
  }),
  [levels.locklevel.success]: (state, { payload }) => update(state, {
    entities: { levels: { [payload.id]: { $merge: { isSubmitting: false, isLocked: true } } } },
  }),
  [levels.unlocklevel.success]: (state, { payload }) => update(state, {
    entities: { levels: { [payload.id]: { $merge: { isSubmitting: false, isLocked: false } } } },
  }),
  [combineActions(
    app.review.lock.success,
    app.review.unlock.success,
  )]: (state, { payload }) => update(state, {
    entities: { reviews: { [payload.id]: { $merge: { isHidden: payload.isHidden } } } },
  }),
  [app.review.synonym.add.success]: (state, { payload }) => update(state, {
    entities: { reviews: { [payload.reviewId]: { synonyms: { $push: [payload] } } } },
  }),
  [app.review.synonym.remove.success]: (state, { payload: { reviewId, id } }) => update(state, {
    entities: { reviews: { [reviewId]: { synonyms: { $apply:
      (synonyms) => synonyms.filter((syn) => syn.id !== id),
    } } } },
  }),
}, initialState);

export default appReducer;
