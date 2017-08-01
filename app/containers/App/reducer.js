import { combineReducers } from 'redux';
import { handleActions, combineActions } from 'redux-actions';
import update from 'immutability-helper';
import merge from 'lodash/merge';
import union from 'lodash/union';
import difference from 'lodash/difference';

import app from './actions';

export const initialState = {
  profile: {},
  dashboard: {
    lessonsCount: 0,
    reviewsCount: 0,
    nextHourReviews: 0,
    nextDayReviews: 0,
    srsCounts: {},
  },
  // TODO: get Tadgh to update settings with new options + their defaults!
  // NOTE: update serialize/deserializer with anything missing
  settings: {
    quiz: {},
    vocabulary: {
      kanjiStroke: {},
    },
  },
  entities: {
    reviews: {},
    levels: {},
  },
  session: {
    lessons: {
      lastActivity: null,
      current: false,
      queue: [],
      correct: [],
      incorrect: [],
    },
    reviews: {
      lastActivity: null,
      current: false,
      queue: [],
      correct: [],
      incorrect: [],
    },
  },
};

const profileReducer = handleActions({
  [app.user.load.success]: (state, { payload }) => payload.profile,
}, initialState.profile);

const dashboardReducer = handleActions({
  [app.user.load.success]: (state, { payload }) => payload.dashboard,
}, initialState.dashboard);

const settingsReducer = handleActions({
  [app.user.load.success]: (state, { payload }) => update(state, {
    $set: merge({}, state, payload.settings),
  }),
  [app.settings.save.success]: (state, { payload }) => update(state, {
    $set: merge({}, state, payload),
  }),
}, initialState.settings);

const reviewSessionReducer = handleActions({
  [app.reviews.queue.load.success]: (state, { payload }) => update(state, {
    queue: { $set: union(state.queue, payload.reviewIds) },  // TODO: replace as "ids" in serializer/logic etc
  }),
  [app.reviews.current.set]: (state, { payload }) => update(state, {
    current: { $set: payload },
    queue: { $set: difference(state.queue, [payload]) },
  }),
  [app.reviews.current.return]: (state, { payload }) => update(state, {
    queue: { $set: union(state.queue, [state.current]) },
    current: { $set: payload },
  }),
  [app.reviews.correct.add]: (state, { payload }) => update(state, {
    correct: { $set: union(state.correct, [payload]) },
    lastActivity: { $set: Date.now() },
  }),
  [app.reviews.incorrect.add]: (state, { payload }) => update(state, {
    incorrect: { $set: union(state.incorrect, [payload]) },
    lastActivity: { $set: Date.now() },
  }),
  [app.reviews.resetSession]: (state) => update(state, {
    correct: { $set: [] },
    incorrect: { $set: [] },
  }),
}, initialState.session.reviews);

// TODO: can probably unduplicate these
// perhaps part of setting "category" in session state root
const lessonSessionReducer = handleActions({
  [app.lessons.queue.load.success]: (state, { payload }) => update(state, {
    queue: { $set: union(state.queue, payload.reviewIds) }, // TODO: replace as "ids" in serializer/logic etc
  }),
  [app.lessons.current.set]: (state, { payload }) => update(state, {
    current: { $set: payload },
    queue: { $set: difference(state.queue, [payload]) },
  }),
  [app.lessons.current.return]: (state, { payload }) => update(state, {
    queue: { $set: union(state.queue, [state.current]) },
    current: { $set: payload },
  }),
  [app.lessons.correct.add]: (state, { payload }) => update(state, {
    correct: { $set: union(state.correct, [payload]) },
    lastActivity: { $set: Date.now() },
  }),
  [app.lessons.incorrect.add]: (state, { payload }) => update(state, {
    incorrect: { $set: union(state.incorrect, [payload]) },
    lastActivity: { $set: Date.now() },
  }),
  [app.lessons.resetSession]: (state) => update(state, {
    correct: { $set: [] },
    incorrect: { $set: [] },
  }),
}, initialState.session.lessons);

const entitiesReducer = handleActions({
  [combineActions(
    app.reviews.queue.load.success,
    app.lessons.queue.load.success
  )]: (state, { payload }) => update(state, {
    reviews: { $set: merge({}, state.reviews, payload.reviews) },
  }),
  [app.levels.load.success]: (state, { payload }) => update(state, {
    levels: { $set: merge({}, state.levels, payload) },
  }),
  [app.level.load.success]: (state, { payload }) => update(state, {
    levels: { [payload.id]: { $set: merge({}, state.levels[payload.id], { reviews: payload.reviewIds }) } },
    reviews: { $set: merge({}, state.reviews, payload.reviews) },
  }),
  [app.review.load.success]: (state, { payload }) => update(state, {
    reviews: { [payload.id]: { $set: payload } },
  }),
  [app.review.update]: (state, { payload }) => payload ? update(state, {
    reviews: { [payload.id]: { $set: merge({}, state.reviews[payload.id], payload) } },
  }) : state,
  [app.review.synonym.add.success]: (state, { payload }) => update(state, {
    reviews: { [payload.reviewId]: { synonyms: { $push: [payload] } } },
  }),
  [app.review.synonym.remove.success]: (state, { payload }) => update(state, {
    reviews: { [payload.reviewId]: {
      synonyms: { $apply: (synonyms) => synonyms.filter((synonym) => synonym.id !== payload.id) } },
    },
  }),
  [combineActions(
    app.review.lock.success,
    app.review.unlock.success,
  )]: (state, { payload }) => update(state, {
    reviews: { [payload.id]: { isHidden: { $set: payload.isHidden } } },
  }),
  [app.level.lock.success]: (state, { payload }) => update(state, {
    levels: { [payload.id]: { isLocked: { $set: true } } },
  }),
  [app.level.unlock.success]: (state, { payload }) => update(state, {
    levels: { [payload.id]: { isLocked: { $set: false } } },
  }),
}, initialState.entities);

export default combineReducers({
  profile: profileReducer,
  dashboard: dashboardReducer,
  settings: settingsReducer,
  entities: entitiesReducer,
  session: combineReducers({
    reviews: reviewSessionReducer,
    lessons: lessonSessionReducer,
  }),
});
