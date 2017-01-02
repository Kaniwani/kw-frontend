import { createSelector } from 'reselect';
import calculatePercentage from 'utils/calculatePercentage';

import {
  selectTotalCount,
  selectCompletedCount,
} from 'containers/ReviewPage/selectors';

import {
  selectAnsweredCount,
  selectCorrectCount,
} from 'containers/ReviewSession/selectors';

const selectPercentCorrect = () => createSelector(
  selectCorrectCount(),
  selectAnsweredCount(),
  (correct, answered) => calculatePercentage(correct, answered),
);

const selectPercentCompleted = () => createSelector(
  selectAnsweredCount(),
  selectTotalCount(),
  (answered, total) => calculatePercentage(answered, total),
);

const selectRemainingCount = () => createSelector(
  selectTotalCount(),
  selectCompletedCount(),
  (total, completed) => ((total - 1 /* take into account current review */) - completed) || 0,
);

export {
  selectPercentCorrect,
  selectPercentCompleted,
  selectRemainingCount,
  selectCompletedCount,
};
