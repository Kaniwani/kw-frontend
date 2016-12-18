import { createSelector } from 'reselect';
import getSrsRankName from 'utils/getSrsRankName';

/**
 * Direct selector to the review state domain
 */
const selectReviewSession = () => (state) => state.get('session');

const selectCurrent = () => createSelector(
  selectReviewSession(),
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
  (substate) => substate.getIn(['session', 'streak']),
);

const selectCurrentStreakName = () => createSelector(
  selectCurrentStreak(),
  (streakNum) => getSrsRankName(streakNum),
);

const selectCorrectCount = () => createSelector(
  selectReviewSession(),
  (substate) => substate.get('correct'),
);

const selectIncorrectCount = () => createSelector(
  selectReviewSession(),
  (substate) => substate.get('incorrect'),
);

const selectIgnoredCount = () => createSelector(
  selectReviewSession(),
  (substate) => substate.get('ignored'),
);

const selectAnsweredCount = () => createSelector(
  selectCorrectCount(),
  selectIncorrectCount(),
  (correct, incorrect) => correct + incorrect,
);

export default selectReviewSession;

export {
  selectReviewSession,
  selectCurrent,
  selectCurrentVocab,
  selectCurrentReadings,
  selectCurrentMeaning,
  selectCurrentStreak,
  selectCurrentStreakName,
  selectAnsweredCount,
  selectCorrectCount,
  selectIncorrectCount,
  selectIgnoredCount,
};
