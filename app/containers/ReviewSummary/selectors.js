import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import {
  selectCompleted,
  selectQueue,
} from 'containers/ReviewPage/selectors';

import {
  selectRemainingCount,
  selectPercentCorrect,
} from 'containers/ReviewHeader/selectors';

import { SRS_RANKS } from 'shared/constants';
import isCritical from './utils/isCritical';
import getSrsRankName from 'utils/getSrsRankName';

// FIXME: uhh, this isn't selecting the current session completed correctly.
const selectCorrectItems = () => createSelector(
  selectCompleted(),
  (completed) => completed.filter((item) => {
    const correctCount = item.getIn(['session', 'correct']);
    const incorrectCount = item.getIn(['session', 'incorrect']);
    return correctCount >= 1 && incorrectCount < 1;
  }),
);

const selectIncorrectItems = () => createSelector(
  selectQueue(),
  (queue) => queue.filter((item) => item.getIn(['session', 'incorrect']) >= 1),
);

const categorizeItems = (list) => {
  const shape = fromJS({
    count: list.size,
    ranks: {
      [SRS_RANKS.ONE]: [],
      [SRS_RANKS.TWO]: [],
      [SRS_RANKS.THREE]: [],
      [SRS_RANKS.FOUR]: [],
      [SRS_RANKS.FIVE]: [],
    },
  });
  return list.reduce((dict, item) => {
    const rankName = getSrsRankName(item.getIn(['session', 'streak']));
    const newState = dict.getIn(['ranks', rankName]).push(item);
    return dict.setIn(['ranks', rankName], newState);
  }, shape);
};

const selectCorrectCategorized = () => createSelector(
  selectCorrectItems(),
  (list) => categorizeItems(list).toJS(),
);

const selectIncorrectCategorized = () => createSelector(
  selectIncorrectItems(),
  (list) => categorizeItems(list).toJS(),
);

const selectAllSummaryItems = () => createSelector(
  selectCorrectItems(),
  selectIncorrectItems(),
  (correct, incorrect) => correct.concat(incorrect),
);

// TODO: store criticality during review instead so we can sort descending and slice the top 10
const selectCriticalItems = () => createSelector(
  selectAllSummaryItems(),
  (items) => items.filter((item) => isCritical(item)).toJS(),
);

const selectIgnoredCount = () => createSelector(
  selectQueue(),
  selectCompleted(),
  (queue, completed) => queue.concat(completed).reduce((sum, item) => sum + item.getIn(['session', 'ignored']), 0));


export {
  selectCorrectCategorized,
  selectIncorrectCategorized,
  selectCriticalItems,
  selectIgnoredCount,
  selectRemainingCount,
  selectPercentCorrect,
};
