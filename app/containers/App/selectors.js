import { createSelector } from 'reselect';
import toArray from 'lodash/toArray';

import { denormalizeReview, denormalizeReviews, denormalizeVocabulary } from 'shared/schemas';

const selectGlobal = (state) => state.global;
const selectEntities = createSelector(
  selectGlobal,
  (state) => state.entities,
);

const makeSelectEntityById = (entity) => (state, props) =>
  state.global.entities[entity][props.match.params.id || props.id];

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

const makeSelectReviews = () => createSelector(
  [selectEntities],
  (entities) => {
    const reviews = toArray(entities.reviews);
    return reviews && denormalizeReviews(reviews, entities);
  }
);

const makeSelectReview = () => createSelector(
  [makeSelectEntityById('reviews'), selectEntities],
  (review, entities) => review && denormalizeReview(review, entities)
);

const makeSelectQueue = () => createSelector(
  selectGlobal,
  (state) => state.queue
);

const makeSelectLevels = () => createSelector(
  selectEntities,
  (state) => toArray(state.levels)
);

const makeSelectLevel = () => createSelector(
  [makeSelectEntityById('levels'), selectEntities],
  (level, entities) => level && denormalizeVocabulary(level.ids, entities)
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
  makeSelectReviews,
  makeSelectLevels,
  makeSelectLevel,
};
