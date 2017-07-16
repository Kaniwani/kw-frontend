import { combineReducers } from 'redux';
import { handleActions, combineActions } from 'redux-actions';
import update from 'immutability-helper';
import merge from 'lodash/merge';
import union from 'lodash/union';
import difference from 'lodash/difference';

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

import app from './actions';

const initialState = {
  user: {
    profile: {},
    dashboard: {
      lessonsCount: 0,
      reviewsCount: 0,
      srsCounts: {
        apprentice: 0,
        guru: 0,
        master: 0,
        enlightened: 0,
        burned: 0,
      },
    },
    // TODO: get Tadgh to update settings with new options!
    // NOTE: move defaults to serializer once api is updated to provide them
  },
  settings: {
    quiz: {
      detail: 0, // 0-2
      autoExpandCorrect: true,
      autoExpandIncorrect: true,
      autoAdvance: {
        active: true,
        speed: 4000,
      },
    },
    vocabulary: {
      // FIXME: put expandedCards in summarysection && vocablevel reducer so all 4 can be independent
      expandedCards: false,
      useAlcPro: false,
      kanjiStroke: {
        autoplay: true,
        step: 0.01,
        stroke: { order: { visible: false } },
        grid: { show: true },
      },
    },
  },
  lessons: {
    // uses same entities as reviews
    current: false,
    queue: [],
    correct: [],
    incorrect: [],
  },
  reviews: {
    entities: {},
    current: false,
    queue: [],
    correct: [],
    incorrect: [],
  },
  levels: {
    entities: {},
  },
  ui: {
    error: false,
    user: {
      loading: false,
    },
    reviews: {
      loading: false,
    },
    lessons: {
      loading: false,
    },
    levels: {
      loading: false,
      submitting: [],
    },
    level: {
      loading: false,
    },
    entry: {
      loading: false,
    },
  },
};

const userReducer = handleActions({
  [app.user.load.success]: (state, { payload }) => update(state, {
    $set: merge({}, state, { dashboard: payload.dashboard, profile: payload.profile }),
  }),
}, initialState.user);

const settingsReducer = handleActions({
  [app.user.load.success]: (state, { payload }) => update(state, {
    $set: merge({}, state, payload.settings),
  }),
  [app.settings.vocabulary.expanded.toggle]: (state) => update(state, {
    vocabulary: { expandedCards: { $apply: (value) => !value } },
  }),
}, initialState.settings);

const uiReducer = handleActions({
  // TODO: can we simplify some of these to add a category to the action meta instead?
  [app.user.load.request]: (state) => update(state, {
    user: { loading: { $set: true } },
  }),
  [combineActions(
    app.user.load.failure,
    app.user.load.cancel,
    app.user.load.success,
  )]: (state) => update(state, {
    user: { loading: { $set: false } },
  }),
  [combineActions(
    app.user.load.failure,
  )]: (state, { payload }) => {
    // TODO: take all errors
    // TODO: log to slack
    console.warn('api failure'); // eslint-disable-line no-console
    console.error(payload); // eslint-disable-line no-console
    return update(state, {
      user: { error: { $set: payload } },
    });
  },
  [combineActions(
    app.level.lock.request,
    app.level.unlock.request,
  )]: (state, { payload }) => update(state, {
    levels: { submitting: { $push: [payload.id] } },
  }),
  [combineActions(
    app.level.lock.success,
    app.level.unlock.success,
  )]: (state, { payload }) => update(state, {
    levels: { submitting: { $apply: (ids) => difference(ids, [payload.id]) } },
  }),
}, initialState.ui);

const levelsReducer = handleActions({
  [combineActions(
    app.levels.load.success,
  )]: (state, { payload }) => update(state, {
    entities: { $set: merge({}, state.entities, payload) },
  }),
  [app.level.load.success]: (state, { payload }) => update(state, {
    entities: { [payload.id]: { $set: merge({}, state.entities[payload.id], { reviews: payload.reviewIds }) } },
  }),
  [app.level.lock.success]: (state, { payload }) => update(state, {
    entities: { [payload.id]: { isLocked: { $set: true } } },
  }),
  [app.level.unlock.success]: (state, { payload }) => update(state, {
    entities: { [payload.id]: { isLocked: { $set: false } } },
  }),
}, initialState.levels);

const reviewsReducer = handleActions({
  [app.review.load.success]: (state, { payload }) => update(state, {
    entities: { [payload.id]: { $set: payload } },
  }),
  [app.level.load.success]: (state, { payload }) => update(state, {
    entities: { $set: merge({}, state.entities, payload.reviews) },
  }),
  [combineActions(
    app.reviews.queue.load.success,
    app.lessons.queue.load.success,
  )]: (state, { payload }) => update(state, {
    entities: { $set: merge({}, state.entities, payload.reviews) },
    queue: { $set: union(state.queue, payload.reviewIds) },
  }),
  [app.reviews.current.set]: (state, { payload }) => update(state, {
    current: { $set: 1596 },
    queue: { $set: difference(state.queue, [payload]) },
  }),
  [app.reviews.current.return]: (state, { payload }) => update(state, {
    queue: { $set: union(state.queue, [state.current]) },
    current: { $set: payload },
  }),
  [app.reviews.session.reset]: (state) => update(state, {
    correct: { $set: [] },
    incorrect: { $set: [] },
  }),
  [app.reviews.correct.add]: (state, { payload }) => update(state, {
    correct: { $set: union(state.correct, [payload]) },
  }),
  [app.reviews.incorrect.add]: (state, { payload }) => update(state, {
    incorrect: { $set: union(state.incorrect, [payload]) },
  }),
  [app.review.update]: (state, { payload }) => payload ? update(state, {
    entities: { [payload.id]: { $set: payload } },
  }) : state,
  [combineActions(
    app.review.lock.success,
    app.review.unlock.success,
  )]: (state, { payload }) => update(state, {
    entities: { [payload.id]: { isHidden: { $set: payload.isHidden } } },
  }),
  [app.review.synonym.add.success]: (state, { payload }) => update(state, {
    entities: { [payload.reviewId]: { synonyms: { $push: [payload] } } },
  }),
  [app.review.synonym.remove.success]: (state, { payload }) => update(state, {
    entities: { [payload.reviewId]: {
      synonyms: { $apply: (synonyms) => synonyms.filter((synonym) => synonym.id !== payload.id) } },
    },
  }),
}, initialState.reviews);

const lessonsReducer = handleActions({
  [app.lessons.session.reset]: (state) => update(state, {
    correct: { $set: [] },
    incorrect: { $set: [] },
  }),
  [app.lessons.current.set]: (state, { payload }) => update(state, {
    current: { $set: payload },
    queue: { $set: difference(state.queue, [payload]) },
  }),
  [app.lessons.current.return]: (state, { payload }) => update(state, {
    queue: { $set: union(state.queue, [state.current]) },
    current: { $set: payload },
  }),
}, initialState.lessons);

export default combineReducers({
  ui: uiReducer,
  user: userReducer,
  settings: settingsReducer,
  reviews: reviewsReducer,
  lessons: lessonsReducer,
  levels: levelsReducer,
});
