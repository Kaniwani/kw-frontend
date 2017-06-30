import { createSelector } from 'reselect';
import { denormalizeReview } from 'shared/schemas';

const selectGlobal = (state) => state.global;

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (state) => state.loading
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (state) => state.error
);

const makeSelectUser = () => createSelector(
  selectGlobal,
  (state) => state.user
);

const makeSelectDashboard = () => createSelector(
  selectGlobal,
  (state) => state.dashboard
);

const makeSelectReviewCount = () => createSelector(
  makeSelectDashboard(),
  (state) => state.reviewCount
);

const makeSelectSettings = () => createSelector(
  selectGlobal,
  (state) => state.settings
);

const selectEntities = (state) => state.global.entities;
const selectEntityById = (entity) => (id) => (state) => state.global.entities[entity][id];
const selectReviewById = selectEntityById('reviews');
const selectReview = (state, { id }) => selectReviewById(id)(state);

const makeSelectReview = () => createSelector(
  [selectReview, selectEntities],
  (review, entities) => denormalizeReview(review, entities)
);

const makeSelectQueue = () => createSelector(
  selectGlobal,
  (state) => state.queue
);

const makeSelectLevels = () => createSelector(
  selectGlobal,
  (state) => state.levels
);

export {
  makeSelectLoading,
  makeSelectError,
  makeSelectUser,
  makeSelectDashboard,
  makeSelectReviewCount,
  makeSelectSettings,
  makeSelectQueue,
  makeSelectReview,
  makeSelectLevels,
};
