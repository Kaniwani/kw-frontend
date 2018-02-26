import { isAfter } from 'date-fns';
import { createSelector } from 'reselect';

import devLog from 'common/utils/devLog';
import dateOrFalse from 'common/utils/dateOrFalse';

import { getState, getProp, makeSelectItemIds, makeSelectItemById } from 'common/selectors';
import { selectUserLevel, selectLastWkSyncDate } from 'features/user/selectors';

export const UI_DOMAIN = 'levels';
export const ENTITY_DOMAIN = 'levels';
export const selectVocabLevelsUi = getState(UI_DOMAIN);
export const selectVocabLevelsDomain = getState(['entities', ENTITY_DOMAIN]);
export const selectVocabLevelIds = makeSelectItemIds(selectVocabLevelsDomain);
export const selectVocabLevels = selectVocabLevelsDomain;
export const selectVocabLevelById = makeSelectItemById(selectVocabLevels);

export const selectIsLoading = createSelector([selectVocabLevelById], getState('isLoading', false));

export const selectLastLoad = createSelector(
  [selectVocabLevelById],
  getState('lastLoad', dateOrFalse)
);

export const selectShouldLoad = createSelector(
  [selectLastWkSyncDate, selectIsLoading, selectLastLoad],
  (lastWkSync, isLoading, lastLoad) => {
    const haveDates = lastLoad && lastWkSync;
    const wkSyncSinceLastLoaded = isAfter(lastWkSync, lastLoad);
    devLog({
      isLoading,
      lastWkSync,
      lastLoad,
      haveDates,
      wkSyncSinceLastLoaded,
    });
    devLog(
      'vocab levels should load?',
      isLoading || (lastLoad && lastWkSync && isAfter(lastWkSync, lastLoad))
    );
    return (!lastLoad && !isLoading) || (lastLoad && lastWkSync && isAfter(lastWkSync, lastLoad));
  }
);

export const selectVocabLevelsSubmitting = createSelector(
  selectVocabLevelsUi,
  getState('submitting', [])
);

export const selectVocabLevelIsSubmitting = createSelector(
  [selectVocabLevelsSubmitting, getProp('id')],
  (submitting, id) => submitting.includes(id)
);

export const isWithinUserWKLevel = createSelector(
  [selectUserLevel, getProp('id')],
  (userLevel, id) => +id <= +userLevel
);

export const selectVocabLevelIsActionable = createSelector(
  [isWithinUserWKLevel, selectVocabLevelIsSubmitting],
  (withinLevel, submitting) => withinLevel && !submitting
);

export const selectVocabLevelReviewIds = createSelector(
  selectVocabLevelById,
  getState('reviews', [])
);

export const selectVocabLevelIsLocked = createSelector(
  selectVocabLevelById,
  getState('isLocked', true)
);

export default selectVocabLevelsDomain;
