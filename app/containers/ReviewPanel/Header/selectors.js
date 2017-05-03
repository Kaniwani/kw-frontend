import { createSelector } from 'reselect';
import calculatePercentage from 'utils/calculatePercentage';

import {
  selectTotalCount,
  selectCompleteCount,
  selectAnsweredCount,
  selectCorrectCount,
} from 'containers/ReviewSession/selectors';

const selectPercentCorrect = createSelector(
  selectCorrectCount,
  selectAnsweredCount,
  (correct, answered) => calculatePercentage(correct, answered),
);

const selectPercentComplete = createSelector(
  [selectCorrectCount, selectTotalCount],
  (correct, total) => calculatePercentage(correct, total),
);

const selectRemainingCount = createSelector(
  [selectTotalCount, selectCompleteCount],
  (total, complete) => Math.max((total - 1) /* 1 = current review */ - complete, 0),
);

export {
  selectPercentCorrect,
  selectPercentComplete,
  selectRemainingCount,
  selectCompleteCount,
};
