import { createSelector } from 'reselect';
import isNumber from 'lodash/isNumber';
import titleCase from 'voca/title_case';

export const selectError = (state) => state.global.ui.error;
export const selectProfile = (state) => state.global.user.profile;
export const selectDashboard = (state) => state.global.user.dashboard;
export const selectSettings = (state) => state.global.settings;
export const selectUi = (state) => state.global.ui;
export const createSelectSessionCount = (name) => createSelector(
  selectDashboard,
  (dashboard) => dashboard[`${name}Count`]
);
export const selectUserLevel = createSelector(selectProfile, (state) => state.currentLevel);
export const selectReviewCount = createSelectSessionCount('review');
export const selectLessonCount = createSelectSessionCount('lesson');

export const selectEntities = (state) => state.global.entities;
export const createSelectEntities = (name) => createSelector(
  selectEntities,
  (entities) => entities[name]
);
export const createSelectEntityById = (entity, id) => createSelector(
  createSelectEntities(entity),
  (entities) => entities[id],
);

export const selectLevels = createSelectEntities('levels');
export const selectLevelIds = createSelector(
  selectLevels,
  (levels) => Object.keys(levels),
);
export const selectLevel = (state, props) => createSelectEntityById('levels', props.id)(state);
export const makeSelectLevel = () => createSelector(selectLevel, (level) => level);
export const isWithinUserWKLevel = (id, userLevel) => isNumber(id) && id <= userLevel;
export const isNotNumberedLevel = (id) => !isNumber(id);

export const selectLevelTitle = (state, props) => isNotNumberedLevel(props.id) ? titleCase(props.id) : props.id;
export const selectLevelCount = createSelector(selectLevel, (level) => level.count);
export const selectLevelSubmitting = (state, props) => selectUi(state).level.submitting.includes(props.id);
export const selectLevelActionable = createSelector(
  [makeSelectLevel(), selectUserLevel, selectLevelSubmitting],
  ({ id }, userLevel, isSubmitting) => !isSubmitting && (isWithinUserWKLevel(id, userLevel) || isNotNumberedLevel(id)),
);

export const selectLevelLocked = createSelector(
  makeSelectLevel(),
  (level) => level.isLocked,
);

//
// // VocabLevelPage
// import pick from 'lodash/pick';
//
// const makeSelectLevelReviews = () => createSelector(
//   [makeSelectLevel()],
//   (level) => level && levels.ids || [],
// );
