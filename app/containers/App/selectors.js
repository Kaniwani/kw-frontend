import { createSelector } from 'reselect';

const selectError = (state) => state.global.ui.error;
const selectProfile = (state) => state.global.user.profile;
const selectDashboard = (state) => state.global.user.dashboard;
const selectSettings = (state) => state.global.settings;
const createSelectSessionCount = (name) => createSelector(
  selectDashboard,
  (dashboard) => dashboard[`${name}Count`]
);
const selectUserLevel = createSelector(selectProfile, (state) => state.currentLevel);
const selectReviewCount = createSelectSessionCount('review');
const selectLessonCount = createSelectSessionCount('lesson');

const selectEntities = (state) => state.global.entities;
const createSelectEntities = (name) => createSelector(
  selectEntities,
  (entities) => entities[name]
);
const createSelectEntityById = (entity, id) => createSelector(
  createSelectEntities(entity),
  (entities) => entities[id],
);
const selectLevels = createSelectEntities('levels');
const selectLevelIds = createSelector(
  selectLevels,
  (levels) => Object.keys(levels),
);
const selectLevel = (state, { id }) => createSelectEntityById('levels', id)(state);
// const isWithinUserWKLevel = (id, userLevel) => isNumber(id) && id <= userLevel;
// const isNotNumberedLevel = (id) => !isNumber(id);
// const levelTitle = (id) => isNotNumberedLevel(id) ? titleCase(id) : id;
//
// const selectLevelIsActionable = createSelector(
//   [selectLevel, selectUserLevel, selectLevelSubmitting],
//   !isSubmitting && (isWithinUserWKLevel(id, userLevel) || isNotNumberedLevel(id)),
// );

// VocabLevelPage
import pick from 'lodash/pick';

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
  selectError,
  selectProfile,
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
