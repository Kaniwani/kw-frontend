import { combineReducers } from 'redux';
import { handleActions, combineActions } from 'redux-actions';
import update from 'immutability-helper';
import merge from 'lodash/merge';
import union from 'lodash/union';
import difference from 'lodash/difference';

import app from './actions';

export const initialState = {
  announcements: [],
  profile: {
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
    vocabulary: {},
  },
  entities: {
    reviews: {},
    levels: {},
  },
  queue: {
    reviews: [],
    lessons: [],
  },
  session: {
    lessons: {
      current: {},
      correct: [],
      incorrect: [],
    },
    reviews: {
      current: {},
      correct: [],
      incorrect: [],
    },
  },
  summary: {
    lessons: {
      lastActivity: false,
      correct: [],
      incorrect: [],
    },
    reviews: {
      lastActivity: false,
      correct: [],
      incorrect: [],
    },
  },
};

const announcementsReducer = handleActions({
  [app.announcements.load.success]: (state, { payload }) => payload,
}, initialState.announcements);

const profileReducer = handleActions({
  [app.clearGlobalState]: () => initialState.profile,
  [app.user.load.success]: (state, { payload }) => payload.profile,
}, initialState.profile);

const settingsReducer = handleActions({
  [app.clearGlobalState]: () => initialState.settings,
  [app.user.load.success]: (state, { payload }) => update(state, {
    $set: merge({}, state, payload.settings),
  }),
  [app.settings.save.success]: (state, { payload }) => update(state, {
    $set: merge({}, state, payload),
  }),
}, initialState.settings);

const reviewQueueReducer = handleActions({
  [app.clearGlobalState]: () => initialState.queue.reviews,
  [app.reviews.queue.clear]: () => [],
  [app.reviews.queue.load.success]: (state, { payload }) => union(state, payload.ids),
  [app.reviews.current.set]: (state, { payload }) => difference(state, [payload.id]),
  [app.reviews.current.return]: (state, { payload: { currentId } }) => union(state, [currentId]),
}, initialState.queue.reviews);

const lessonQueueReducer = handleActions({
  [app.clearGlobalState]: () => initialState.queue.lessons,
  [app.lessons.queue.clear]: () => [],
  [app.lessons.queue.load.success]: (state, { payload }) => union(state, payload.ids),
  [app.lessons.current.set]: (state, { payload }) => difference(state, [payload.id]),
  [app.lessons.current.return]: (state, { payload: { currentId } }) => union(state, [currentId]),
}, initialState.queue.lessons);

const reviewSessionReducer = handleActions({
  [app.clearGlobalState]: () => initialState.session.reviews,
  [app.reviews.current.set]: (state, { payload }) => update(state, {
    current: { $set: payload },
  }),
  [app.reviews.current.update]: (state, { payload }) => update(state, {
    current: { $set: payload },
  }),
  [app.reviews.current.return]: (state, { payload: { newCurrent } }) => update(state, {
    current: { $set: newCurrent },
  }),
  [app.reviews.correct.add]: (state, { payload }) => update(state, {
    correct: { $set: union(state.correct, [payload]) },
  }),
  [app.reviews.incorrect.add]: (state, { payload }) => update(state, {
    incorrect: { $set: union(state.incorrect, [payload]) },
  }),
}, initialState.session.reviews);

const lessonSessionReducer = handleActions({
  [app.clearGlobalState]: () => initialState.session.lessons,
  [app.lessons.current.set]: (state, { payload }) => update(state, {
    current: { $set: payload },
  }),
  [app.lessons.current.update]: (state, { payload }) => update(state, {
    current: { $set: payload },
  }),
  [app.lessons.current.return]: (state, { payload: { newCurrent } }) => update(state, {
    current: { $set: newCurrent },
  }),
  [app.lessons.correct.add]: (state, { payload }) => update(state, {
    correct: { $set: union(state.correct, [payload]) },
  }),
  [app.lessons.incorrect.add]: (state, { payload }) => update(state, {
    incorrect: { $set: union(state.incorrect, [payload]) },
  }),
}, initialState.session.lessons);

const reviewSummaryReducer = handleActions({
  [app.clearGlobalState]: () => initialState.summary.reviews,
  [app.reviews.correct.add]: (state, { payload }) => update(state, {
    correct: { $set: union(state.correct, [payload]) },
    lastActivity: { $set: new Date() },
  }),
  [app.reviews.incorrect.add]: (state, { payload }) => update(state, {
    incorrect: { $set: union(state.incorrect, [payload]) },
    lastActivity: { $set: new Date() },
  }),
  [app.reviews.resetSession]: (state) => update(state, {
    correct: { $set: [] },
    incorrect: { $set: [] },
  }),
}, initialState.summary.reviews);

const lessonSummaryReducer = handleActions({
  [app.clearGlobalState]: () => initialState.summary.lessons,
  [app.lessons.correct.add]: (state, { payload }) => update(state, {
    correct: { $set: union(state.correct, [payload]) },
    lastActivity: { $set: new Date() },
  }),
  [app.lessons.incorrect.add]: (state, { payload }) => update(state, {
    incorrect: { $set: union(state.incorrect, [payload]) },
    lastActivity: { $set: new Date() },
  }),
  [app.lessons.resetSession]: (state) => update(state, {
    correct: { $set: [] },
    incorrect: { $set: [] },
  }),
}, initialState.summary.lessons);

const entitiesReducer = handleActions({
  [app.clearGlobalState]: () => initialState.entities,
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
    levels: { [payload.id]: {
      reviews: { $set: payload.ids },
      prevLoaded: { $set: true },
    } },
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
    levels: { [payload.id]: { isLocked: { $set: true }, reviews: { $set: [] } } },
  }),
  [app.level.unlock.success]: (state, { payload }) => update(state, {
    levels: { [payload.id]: { isLocked: { $set: false } } },
  }),
}, initialState.entities);

const reducers = {
  profile: profileReducer,
  settings: settingsReducer,
  announcements: announcementsReducer,
  entities: entitiesReducer,
  queue: combineReducers({
    reviews: reviewQueueReducer,
    lessons: lessonQueueReducer,
  }),
  summary: combineReducers({
    reviews: reviewSummaryReducer,
    lessons: lessonSummaryReducer,
  }),
  session: combineReducers({
    reviews: reviewSessionReducer,
    lessons: lessonSessionReducer,
  }),
};

export default reducers;
