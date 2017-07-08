import { createSelector } from 'reselect';

const selectLoading = (state) => state.global.loading;
const selectError = (state) => state.global.error;
const selectUser = (state) => state.global.user;
const selectDashboard = (state) => state.global.dashboard;
const selectSettings = (state) => state.global.settings;
const selectEntities = (state) => state.global.entities;
const makeSelectSessionCount = (category) => createSelector(
  selectDashboard,
  (dashboard) => dashboard[`${category}Count`]
);
const selectReviewCount = makeSelectSessionCount('review');
const selectLessonCount = makeSelectSessionCount('lesson');

// FIXME: these

// VocabLevelsPage

const selectLevels = (state) => Object.keys(state.global.entities.levels);
const selectUserLevel = (state) => state.global.user.currentLevel;
const selectLevelById = (state, { id }) => state.global.entities.levels[id];
const makeSelectLevel = () => createSelector(
  selectLevelById,
  (level) => level,
);

// VocabLevelPage
import pick from 'lodash/pick';

import { selectEntities } from 'containers/App/selectors';
const selectLevel = (state, { id, match: { params: { id: routeId } } }) => state.global.entities.levels[id || routeId];

const makeSelectLevelReviews = () => createSelector(
  [selectEntities, selectLevel],
  (entities, level) => level && denormalizeReviews(Object.values(pick(entities.reviews, level.reviews)), entities)
);


// VocabEntryPage
import omit from 'lodash/omit';
import { selectSettings, selectEntities } from 'containers/App/selectors';

const selectReviewById = (state, { id }) => state.global.entities.reviews[id];

const flattenReview = (review) => {
  const { vocabulary: { meanings, readings } } = review;
  return {
    ...omit(review, ['vocabulary']),
    meanings,
    readings,
  };
};

const selectReview = createSelector(
  [selectEntities, selectReviewById],
  (entities, review) => review && flattenReview(denormalizeReview(review, entities))
);


export {
  selectLoading,
  selectError,
  selectUser,
  selectDashboard,
  selectReviewCount,
  selectLessonCount,
  selectSettings,
  selectEntities,
};
