import { createSelector } from 'reselect';
import { isFinite } from 'lodash';
import { selectUserLevel, isNotNumberedLevel } from 'shared/selectors';

const isWithinUserWKLevel = (id, userLevel) => isFinite(+id) && +id <= userLevel;

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
