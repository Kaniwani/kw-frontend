import { isBefore, addDays, parse } from "date-fns";
import { createSelector } from "reselect";
import { selectUserLevel } from "features/user/selectors";

import {
  getState,
  getProp,
  makeSelectDomain,
  makeSelectEntityDomain,
  makeSelectItemIds,
  makeSelectItemById,
  makeSelectDomainShouldLoad,
} from "common/selectors";

export const UI_DOMAIN = 'levels';

const shouldLoad = ({ isLoading, lastLoad }) => {
  if (isLoading) {
    return false;
  }
  const yesterday = addDays(new Date(), -1);
  return !lastLoad || isBefore(parse(lastLoad), yesterday);
};

export const selectVocabLevelsShouldLoad = makeSelectDomainShouldLoad(UI_DOMAIN, shouldLoad);

export const ENTITY_DOMAIN = "levels";
export const selectVocabLevelsUi = makeSelectDomain(UI_DOMAIN);
export const selectVocabLevelsDomain = makeSelectEntityDomain(ENTITY_DOMAIN);
export const selectVocabLevelIds = makeSelectItemIds(selectVocabLevelsDomain);
export const selectVocabLevels = selectVocabLevelsDomain;
export const selectVocabLevelById = makeSelectItemById(selectVocabLevels);

export const selectVocabLevelsSubmitting = createSelector(
  selectVocabLevelsUi,
  getState("submitting", [])
);

export const selectVocabLevelIsSubmitting = createSelector(
  [selectVocabLevelsSubmitting, getProp("id")],
  (submitting, id) => submitting.includes(id)
);

export const isWithinUserWKLevel = createSelector(
  [selectUserLevel, getProp("id")],
  (userLevel, id) => +id <= +userLevel
);

export const selectVocabLevelIsActionable = createSelector(
  [isWithinUserWKLevel, selectVocabLevelIsSubmitting],
  (withinLevel, submitting) => withinLevel && !submitting
);

export const selectVocabLevelReviewIds = createSelector(
  selectVocabLevelById,
  getState("reviews", [])
);

export const selectVocabLevelIsLocked = createSelector(
  selectVocabLevelById,
  getState('isLocked', true)
);

export default selectVocabLevelsDomain;
