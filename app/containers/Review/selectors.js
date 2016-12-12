import { createSelector } from 'reselect';
import getSrsRankName from 'utils/getSrsRankName';

/**
 * Direct selector to the review state domain
 */
const selectReviewDomain = () => (state) => state.get('review');

/**
 * Other specific selectors
 */
const selectLoading = () => createSelector(
  selectReviewDomain(),
  (substate) => substate.get('loading'),
);

const selectError = () => createSelector(
  selectReviewDomain(),
  (substate) => substate.get('error'),
);

const selectQueue = () => createSelector(
  selectReviewDomain(),
  (substate) => substate.get('queue'),
);

const selectCurrent = () => createSelector(
  selectReviewDomain(),
  (substate) => substate.get('current'),
);

const selectCurrentVocab = () => createSelector(
  selectCurrent(),
  (substate) => substate.get('vocabulary'),
);

const selectCurrentReadings = () => createSelector(
  selectCurrentVocab(),
  (substate) => substate.get('readings'),
);

const selectCurrentMeaning = () => createSelector(
  selectCurrentVocab(),
  (substate) => substate.get('meaning'),
);

const selectCurrentStreak = () => createSelector(
  selectCurrent(),
  (substate) => substate.get('streak'),
);

const selectCurrentStreakName = () => createSelector(
  selectCurrentStreak(),
  (streakNum) => getSrsRankName(streakNum).toUpperCase(),
);

const selectQueueCount = () => createSelector(
  selectQueue(),
  (queueList) => queueList.size,
);

const selectSession = () => createSelector(
  selectReviewDomain(),
  (substate) => substate.get('session'),
);

const selectCompletedCount = () => createSelector(
  selectReviewDomain(),
  (substate) => substate.get('completed').size,
);

const selectCorrectCount = () => createSelector(
  selectSession(),
  (substate) => substate.get('correct'),
);

const selectIncorrectCount = () => createSelector(
  selectSession(),
  (substate) => substate.get('incorrect'),
);

const selectAnsweredCount = () => createSelector(
  selectCorrectCount(),
  selectIncorrectCount(),
  (correct, incorrect) => correct + incorrect,
);

const selectTotalCount = () => createSelector(
  selectReviewDomain(),
  (substate) => substate.get('total'),
);

export default selectReviewDomain;

export {
  selectError,
  selectLoading,
  selectQueue,
  selectCurrent,
  selectCurrentVocab,
  selectCurrentReadings,
  selectCurrentMeaning,
  selectCurrentStreak,
  selectCurrentStreakName,
  selectQueueCount,
  selectTotalCount,
  selectCompletedCount,
  selectAnsweredCount,
  selectCorrectCount,
  selectIncorrectCount,
};
