import { combineReducers } from 'redux';
import { handleActions, combineActions } from 'redux-actions';
import update from 'immutability-helper';
import { merge, union, difference } from 'lodash';

import app from './actions';

export const initialState = {
  announcements: [],
  profile: {
    lessonsCount: 0,
    reviewsCount: 0,
    nextHourReviews: 0,
    nextDayReviews: 0,
    srsCounts: {},
    upcomingReviews: [],
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
    current: {},
    correct: [],
    incorrect: [],
  },
  summary: {
    lessons: {
      lastActivityDate: false,
      correct: [],
      incorrect: [],
    },
    reviews: {
      lastActivityDate: false,
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

const sessionReducer = handleActions({
  [combineActions(
    app.clearGlobalState,
    app.resetSession,
  )]: () => initialState.session,
  [combineActions(
    app.lessons.current.set,
    app.reviews.current.set,
  )]: (state, { payload }) => update(state, {
    current: { $set: payload },
  }),
  [combineActions(
    app.lessons.current.update,
    app.reviews.current.update,
  )]: (state, { payload }) => update(state, {
    current: { $set: payload },
  }),
  [combineActions(
    app.lessons.current.return,
    app.reviews.current.return,
  )]: (state, { payload: { newCurrent } }) => update(state, {
    current: { $set: newCurrent },
  }),
  [combineActions(
    app.lessons.correct.add,
    app.reviews.correct.add,
  )]: (state, { payload }) => update(state, {
    correct: { $set: union(state.correct, [payload]) },
  }),
  [combineActions(
    app.lessons.incorrect.add,
    app.reviews.incorrect.add,
  )]: (state, { payload }) => update(state, {
    incorrect: { $set: union(state.incorrect, [payload]) },
  }),
}, initialState.session);

const reviewSummaryReducer = handleActions({
  [app.clearGlobalState]: () => initialState.summary.reviews,
  [app.reviews.correct.add]: (state, { payload }) => update(state, {
    correct: { $set: union(state.correct, [payload]) },
    lastActivityDate: { $set: new Date() },
  }),
  [app.reviews.incorrect.add]: (state, { payload }) => update(state, {
    incorrect: { $set: union(state.incorrect, [payload]) },
    lastActivityDate: { $set: new Date() },
  }),
  [app.reviews.resetSummary]: (state) => update(state, {
    correct: { $set: [] },
    incorrect: { $set: [] },
  }),
}, initialState.summary.reviews);

const lessonSummaryReducer = handleActions({
  [app.clearGlobalState]: () => initialState.summary.lessons,
  [app.lessons.correct.add]: (state, { payload }) => update(state, {
    correct: { $set: union(state.correct, [payload]) },
    lastActivityDate: { $set: new Date() },
  }),
  [app.lessons.incorrect.add]: (state, { payload }) => update(state, {
    incorrect: { $set: union(state.incorrect, [payload]) },
    lastActivityDate: { $set: new Date() },
  }),
  [app.lessons.resetSummary]: (state) => update(state, {
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
  session: sessionReducer,
  summary: combineReducers({
    reviews: reviewSummaryReducer,
    lessons: lessonSummaryReducer,
  }),
};

export default reducers;
