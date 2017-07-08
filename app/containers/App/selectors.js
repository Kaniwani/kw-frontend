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

const selectUserLevel = createSelector(selectUser, (state) => state.currentLevel);

const selectLevels = (state) => state.global.entities.levels;
const selectLevelIds = createSelector(
  selectLevels,
  (levels) => Object.keys(levels),
);
const selectLevelById = (state, { id }) => state.global.entities.levels[id];
const makeSelectLevel = () => createSelector(
  selectLevelById,
  (level) => level
);

// VocabLevelPage
import pick from 'lodash/pick';

const selectLevel = (state, { id, match: { params: { id: routeId } } }) => state.global.entities.levels[id || routeId];

const makeSelectLevelReviews = () => createSelector(
  [selectEntities, selectLevel],
  (entities, level) => level && Object.values(pick(entities.reviews, level.reviews))
);


// VocabEntryPage
import omit from 'lodash/omit';

const selectReviewById = (state, { id }) => state.global.entities.reviews[id];

const flattenReview = (review) => {
  const { vocabulary: { meanings, readings } } = review;
  return {
    ...omit(review, ['vocabulary']),
    meanings,
    readings,
  };
};


export {
  selectLoading,
  selectError,
  selectUser,
  selectDashboard,
  selectReviewCount,
  selectLessonCount,
  selectSettings,
  selectEntities,
  selectLevels,
  selectUserLevel,
  selectLevelById,
  selectLevelIds,
  makeSelectLevel,
  makeSelectLevelReviews,
  selectReviewById,
};
