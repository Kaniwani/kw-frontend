import { createSelector } from 'reselect';
import isNumber from 'lodash/isNumber';
import { selectUserLevel, isNotNumberedLevel } from 'containers/App/selectors';

const isWithinUserWKLevel = (id, userLevel) => isNumber(id) && id <= userLevel;

const selectVocabLevelsDomain = (state) => state.vocabLevels;

export const selectLevelsSubmitting = createSelector(
  selectVocabLevelsDomain,
  (levels) => levels.submitting
);

export const makeSelectLevelSubmitting = (id) => createSelector(
  selectLevelsSubmitting,
  (submitting) => submitting.includes(id)
);

export const makeSelectLevelActionable = (id) => createSelector(
  [selectUserLevel, makeSelectLevelSubmitting(id)],
  (userLevel, isSubmitting) => !isSubmitting && (isWithinUserWKLevel(id, userLevel) || isNotNumberedLevel(id)),
);

export default selectVocabLevelsDomain;
