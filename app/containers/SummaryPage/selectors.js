import { createSelector } from 'reselect';

import {
  selectCompleted,
  selectQueue,
} from 'containers/ReviewPage/selectors';

import { selectPercentCorrect } from 'containers/ReviewHeader/selectors';
import isCritical from './utils/isCritical';

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

const selectAllSummaryItems = () => createSelector(
  selectCorrectItems(),
  selectIncorrectItems(),
  (correct, incorrect) => correct.concat(incorrect),
);

const selectCriticalItems = () => createSelector(
  selectAllSummaryItems(),
  (items) => items.filter((item) => isCritical(item)),
);

const selectIgnoredCount = () => createSelector(
  selectQueue(),
  selectCompleted(),
  (queue, completed) => queue.concat(completed).reduce((sum, item) => sum + item.getIn(['session', 'ignored']), 0));


export {
  selectCorrectItems,
  selectIncorrectItems,
  selectCriticalItems,
  selectIgnoredCount,
  selectPercentCorrect,
};
