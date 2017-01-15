import { createSelector } from 'reselect';
import { selectSession, selectReviews } from 'containers/App/selectors';
import { selectRemainingCount, selectPercentCorrect } from 'containers/ReviewHeader/selectors';

import { SRS_RANKS } from 'shared/constants';
import isCritical from './utils/isCritical';
import getSrsRankName from 'utils/getSrsRankName';

export const selectCorrectItems = createSelector(
  [selectSession, selectReviews],
  ({ correct }, reviews) => correct.map((id) => reviews.get(id)),
);

export const selectIncorrectItems = createSelector(
  [selectSession, selectReviews],
  ({ incorrect }, reviews) => incorrect.map((id) => reviews.get(id)),
);

const selectCorrectCategorized = createSelector(
  [selectCorrectItems],
  (list) => categorizeItems(list),
);

const selectIncorrectCategorized = createSelector(
  [selectIncorrectItems],
  (list) => categorizeItems(list),
);

const selectAllSummaryItems = createSelector(
  [selectCorrectItems, selectIncorrectItems],
  (correct, incorrect) => correct.concat(incorrect),
);

// TODO: store criticality during review using getCorrectRatio() instead so we can sort by ratio descending and slice the top 10
const selectCriticalItems = createSelector(
  [selectAllSummaryItems],
  (items) => items.filter((item) => isCritical(item)),
);

const selectIgnoredItems = createSelector(
  [selectAllSummaryItems],
  (items) => items.filter((item) => item.session.ignored > 1),
);


function categorizeItems(list) {
  const dictionary = {
    count: list.size,
    ranks: {
      [SRS_RANKS.ONE]: [],
      [SRS_RANKS.TWO]: [],
      [SRS_RANKS.THREE]: [],
      [SRS_RANKS.FOUR]: [],
      [SRS_RANKS.FIVE]: [],
    },
  };
  return list.reduce((acc, entry) => {
    const rankName = getSrsRankName(entry.session.streak);
    acc.ranks[rankName] = acc.ranks[rankName].concat(entry); // eslint-disable-line no-param-reassign
    return acc;
  }, dictionary);
}

export {
  selectCorrectCategorized,
  selectIncorrectCategorized,
  selectCriticalItems,
  selectIgnoredItems,
  selectRemainingCount,
  selectPercentCorrect,
};
