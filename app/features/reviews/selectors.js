import { createSelector } from "reselect";

import {
  getState,
  getVal,
  makeSelectDomain,
  makeSelectEntityDomain,
  makeSelectItemById,
} from "common/selectors";

export const UI_DOMAIN = "reviews";
export const ENTITY_DOMAIN = "reviews";
export const selectReviewsUi = makeSelectDomain(UI_DOMAIN);
export const selectReviewsDomain = makeSelectEntityDomain(ENTITY_DOMAIN);
export const selectReviews = selectReviewsDomain;
export const selectReviewById = makeSelectItemById(selectReviews);

export const selectReviewVocabIds = createSelector(
  selectReviewById,
  getState("vocab", [])
);

export const selectReviewSynonymIds = createSelector(
  selectReviewById,
  getState("synonyms", [])
);

export const selectNotes = createSelector(selectReviewById, getState("notes", ""));

export const selectPrimaryVocabId = createSelector(selectReviewById, getState("vocab.0", {}));

export const selectStreak = createSelector(selectReviewById, getState("streak", 0));

export const selectIsStubbed = createSelector(
  selectReviewById,
  getVal("wanikaniStreak", (streak) => streak == null)
);

export const selectIsHidden = createSelector(
  selectReviewById,
  getVal("hidden", Boolean)
);

export const selectPrimaryMeaning = createSelector(
  selectReviewById,
  getState("primaryMeaning", "")
);

export const selectSecondaryMeanings = createSelector(
  selectReviewById,
  getState("secondaryMeanings", [])
);

export default selectReviewsDomain;
