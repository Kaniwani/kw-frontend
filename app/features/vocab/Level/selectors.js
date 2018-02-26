import { createSelector } from 'reselect';
import { isAfter } from 'date-fns';

import devLog from 'common/utils/devLog';
import dateOrFalse from 'common/utils/dateOrFalse';
import { getProp, getState, getBy } from 'common/selectors';
import { selectLastWkSyncDate } from 'features/user/selectors';

export const UI_DOMAIN = 'level';
const selectVocabLevelUi = getState(UI_DOMAIN, {});

export const selectLastLoad = createSelector([selectVocabLevelUi, getProp('id')], (state, id) =>
  getBy(['lastLoad', id], dateOrFalse)(state)
);

export const selectIsLoading = createSelector([selectVocabLevelUi, getProp('id')], (state, id) =>
  getState('isLoading', false)(state).includes(id)
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
      'vocab level should load',
      (!lastLoad && !isLoading) || (lastLoad && lastWkSync && isAfter(lastWkSync, lastLoad))
    );
    return (!lastLoad && !isLoading) || (lastLoad && lastWkSync && isAfter(lastWkSync, lastLoad));
  }
);

export const selectError = createSelector([selectVocabLevelUi, getProp('id')], (state, id) =>
  getState(['error', id], false)(state)
);
