import { combineReducers } from 'redux';
import { handleActions, combineActions } from 'redux-actions';
import update from 'immutability-helper';
import { merge, union, difference } from 'lodash';

import actions from './actions';

export const initialState = {
  ui: {
    user: {
      loading: false,
    },
    levels: {
      loading: [],
    },
    lessons: {
      loading: false,
    },
    search: {
      loading: false,
      finished: false,
    },
    reviews: {
      loading: false,
    },
  },
  announcements: [],
  searchResults: [],
  profile: {
    lessonsCount: 0,
    reviewsCount: 0,
    nextHourReviews: 0,
    nextDayReviews: 0,
    srsCounts: {},
    upcomingReviews: [],
  },
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

const uiReducer = handleActions({
  [actions.user.load.request]: (state) => update(state, {
    user: { loading: { $set: true } },
  }),
  [actions.level.load.request]: (state, { payload }) => update(state, {
    levels: { loading: { $push: [payload.id] } },
  }),
  [actions.level.load.success]: (state, { payload }) => update(state, {
    levels: { loading: { $apply: (ids) => difference(ids, [payload.id]) } },
  }),
  [actions.review.search.request]: (state) => update(state, {
    search: {
      loading: { $set: true },
      finished: { $set: false },
    },
  }),
  [actions.review.search.success]: (state, { payload }) => update(state, {
    search: {
      loading: { $set: payload.loading },
      finished: { $set: payload.finished },
    },
  }),
  [actions.review.clearSearch]: (state) => update(state, {
    search: {
      loading: { $set: false },
      finished: { $set: false },
    },
  }),
  [actions.reviews.queue.load.request]: (state) => update(state, {
    reviews: { loading: { $set: true } },
  }),
  [actions.lessons.queue.load.request]: (state) => update(state, {
    lessons: { loading: { $set: true } },
  }),
  [combineActions(
    actions.user.load.success,
    actions.user.load.failure,
  )]: (state) => update(state, {
    user: { loading: { $set: false } },
  }),
  [combineActions(
    actions.reviews.queue.load.success,
    actions.reviews.queue.load.failure,
  )]: (state) => update(state, {
    reviews: { loading: { $set: false } },
  }),
  [combineActions(
    actions.lessons.queue.load.success,
    actions.lessons.queue.load.failure,
  )]: (state) => update(state, {
    lessons: { loading: { $set: false } },
  }),
}, initialState.ui);

const searchReducer = handleActions({
  [actions.review.search.request]: () => initialState.searchResults,
  [actions.review.search.success]: (state, { payload }) => payload.ids,
  [actions.review.clearSearch]: () => [],
}, initialState.searchResults);

const announcementsReducer = handleActions({
  [actions.announcements.load.success]: (state, { payload }) => payload,
}, initialState.announcements);

const profileReducer = handleActions({
  [actions.user.load.success]: (state, { payload }) => payload.profile,
}, initialState.profile);

const settingsReducer = handleActions({
  [actions.user.load.success]: (state, { payload }) => update(state, {
    $set: merge({}, state, payload.settings),
  }),
  [actions.settings.save.success]: (state, { payload }) => update(state, {
    $set: merge({}, state, payload),
  }),
}, initialState.settings);

const reviewQueueReducer = handleActions({
  [actions.reviews.queue.load.success]: (state, { payload }) => union(state, payload.ids),
  [actions.reviews.queue.clear]: () => initialState.queue.reviews,
  [actions.reviews.current.set]: (state, { payload }) => difference(state, [payload.id]),
  [actions.reviews.current.return]: (state, { payload: { currentId } }) => union(state, [currentId]),
}, initialState.queue.reviews);

const lessonQueueReducer = handleActions({
  [actions.lessons.queue.load.success]: (state, { payload }) => union(state, payload.ids),
  [actions.lessons.queue.clear]: () => initialState.queue.lessons,
  [actions.lessons.current.set]: (state, { payload }) => difference(state, [payload.id]),
  [actions.lessons.current.return]: (state, { payload: { currentId } }) => union(state, [currentId]),
}, initialState.queue.lessons);

const sessionReducer = handleActions({
  [actions.resetSession]: () => initialState.session,
  [combineActions(
    actions.lessons.current.set,
    actions.reviews.current.set,
  )]: (state, { payload }) => update(state, {
    current: { $set: payload },
  }),
  [combineActions(
    actions.lessons.current.update,
    actions.reviews.current.update,
  )]: (state, { payload }) => update(state, {
    current: { $set: payload },
  }),
  [combineActions(
    actions.lessons.current.return,
    actions.reviews.current.return,
  )]: (state, { payload: { newCurrent } }) => update(state, {
    current: { $set: newCurrent },
  }),
  [combineActions(
    actions.lessons.correct.add,
    actions.reviews.correct.add,
  )]: (state, { payload }) => update(state, {
    correct: { $set: union(state.correct, [payload]) },
  }),
  [combineActions(
    actions.lessons.incorrect.add,
    actions.reviews.incorrect.add,
  )]: (state, { payload }) => update(state, {
    incorrect: { $set: union(state.incorrect, [payload]) },
  }),
}, initialState.session);

const reviewSummaryReducer = handleActions({
  [actions.reviews.correct.add]: (state, { payload }) => update(state, {
    correct: { $set: union(state.correct, [payload]) },
    lastActivityDate: { $set: new Date() },
  }),
  [actions.reviews.incorrect.add]: (state, { payload }) => update(state, {
    incorrect: { $set: union(state.incorrect, [payload]) },
    lastActivityDate: { $set: new Date() },
  }),
  [actions.reviews.resetSummary]: (state) => update(state, {
    correct: { $set: [] },
    incorrect: { $set: [] },
  }),
}, initialState.summary.reviews);

const lessonSummaryReducer = handleActions({
  [actions.lessons.correct.add]: (state, { payload }) => update(state, {
    correct: { $set: union(state.correct, [payload]) },
    lastActivityDate: { $set: new Date() },
  }),
  [actions.lessons.incorrect.add]: (state, { payload }) => update(state, {
    incorrect: { $set: union(state.incorrect, [payload]) },
    lastActivityDate: { $set: new Date() },
  }),
  [actions.lessons.resetSummary]: (state) => update(state, {
    correct: { $set: [] },
    incorrect: { $set: [] },
  }),
}, initialState.summary.lessons);

const entitiesReducer = handleActions({
  [combineActions(
    actions.reviews.update,
    actions.reviews.queue.load.success,
    actions.lessons.queue.load.success,
  )]: (state, { payload }) => update(state, {
    reviews: { $set: merge({}, state.reviews, payload.reviews) },
  }),
  [actions.levels.load.success]: (state, { payload }) => update(state, {
    levels: { $set: merge({}, state.levels, payload) },
  }),
  [actions.level.load.success]: (state, { payload }) => update(state, {
    levels: { [payload.id]: { reviews: { $set: payload.ids } } },
    reviews: { $set: merge({}, state.reviews, payload.reviews) },
  }),
  [actions.review.load.success]: (state, { payload }) => update(state, {
    reviews: { [payload.id]: { $set: payload } },
  }),
  [actions.review.update]: (state, { payload }) => payload ? update(state, {
    reviews: { [payload.id]: { $set: merge({}, state.reviews[payload.id], payload) } },
  }) : state,
  [actions.review.synonym.add.success]: (state, { payload }) => update(state, {
    reviews: { [payload.reviewId]: { synonyms: { $push: [payload] } } },
  }),
  [actions.review.synonym.remove.success]: (state, { payload }) => update(state, {
    reviews: {
      [payload.reviewId]: { synonyms: { $actionsly: (synonyms) => synonyms.filter((synonym) => synonym.id !== payload.id) } },
    },
  }),
  [combineActions(
    actions.review.lock.success,
    actions.review.unlock.success,
  )]: (state, { payload }) => update(state, {
    reviews: { [payload.id]: { isHidden: { $set: payload.isHidden } } },
  }),
  [actions.level.lock.success]: (state, { payload }) => update(state, {
    levels: { [payload.id]: { isLocked: { $set: true }, reviews: { $set: [] } } },
  }),
  [actions.level.unlock.success]: (state, { payload }) => update(state, {
    levels: { [payload.id]: { isLocked: { $set: false } } },
  }),
}, initialState.entities);

const reducers = {
  ui: uiReducer,
  announcements: announcementsReducer,
  searchResults: searchReducer,
  profile: profileReducer,
  settings: settingsReducer,
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
