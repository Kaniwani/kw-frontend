import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import {
  selectCompleted,
  selectQueue,
  selectTotalCount,
} from 'containers/ReviewPage/selectors';

import { selectPercentCorrect } from 'containers/ReviewHeader/selectors';
import isCritical from './utils/isCritical';
import getSrsRankName from 'utils/getSrsRankName';

// FIXME: uhh, this isn't selecting the current session completed correctly.
// think we need to use a separate state to review perhaps (copy and clear completed when viewing summary?)
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
      apprentice: [],
      guru: [],
      master: [],
      enlightened: [],
      burned: [],
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
  (items) => items.filter((item) => isCritical(item)).slice(0, 10).toJS(),
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
  selectTotalCount,
  selectPercentCorrect,
};
