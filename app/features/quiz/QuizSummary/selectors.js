import { createSelector } from 'reselect';

import { getState, getBy } from 'common/selectors';
import { selectReviews } from 'features/reviews/selectors';
import calculatePercentage from 'common/utils/calculatePercentage';
import groupByRank from 'common/utils/groupByRank';
import dateOrFalse from 'common/utils/dateOrFalse';

const groupIdsByRank = (entities, ids) => {
  const entityExists = (id) => entities[id] != null;
  const addStreakToId = (id) => ({ id, streak: entities[id].streak });
  return ids.every(entityExists) ? groupByRank(ids.map(addStreakToId)) : {};
};

export const DOMAIN = 'quizSummary';
export const selectQuizSummary = (state, { category }) => state[DOMAIN][category];

export const selectSummaryCorrectIds = createSelector(selectQuizSummary, getState('correct', []));

export const selectSummaryIncorrectIds = createSelector(
  selectQuizSummary,
  getState('incorrect', [])
);

export const selectSummaryCriticalIds = createSelector(
  [selectReviews, selectSummaryCorrectIds, selectSummaryIncorrectIds],
  (reviews, correctIds, incorrectIds) =>
    [...correctIds, ...incorrectIds].filter((id) => reviews[id].critical)
);

export const selectSummaryCorrectRankedIds = createSelector(
  [selectReviews, selectSummaryCorrectIds],
  groupIdsByRank
);

export const selectSummaryIncorrectRankedIds = createSelector(
  [selectReviews, selectSummaryIncorrectIds],
  groupIdsByRank
);

export const selectSummaryCriticalRankedIds = createSelector(
  [selectReviews, selectSummaryCriticalIds],
  groupIdsByRank
);

export const selectSummaryCorrectCount = createSelector(
  selectSummaryCorrectIds,
  getState('length', 0)
);

export const selectSummaryIncorrectCount = createSelector(
  selectSummaryIncorrectIds,
  getState('length', 0)
);

export const selectSummaryPercentCorrect = createSelector(
  [selectSummaryCorrectCount, selectSummaryIncorrectCount],
  (correct, incorrect) => {
    const total = correct + incorrect;
    const pristine = total < 1;
    return pristine ? 100 : calculatePercentage(correct, total);
  }
);

export const selectLastActivityDate = createSelector(
  selectQuizSummary,
  getBy('lastActivityDate', dateOrFalse)
);

export default selectQuizSummary;
