import { createSelector } from 'reselect';
import getSrsRankName from 'utils/getSrsRankName';
import selectReviewDomain from 'containers/ReviewPage/selectors';

/**
 * Direct selector to the review state domain
 */
const selectReviewSession = () => createSelector(
  selectReviewDomain(),
  (substate) => substate.get('session'),
);

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
  selectCurrentMeaning,
  selectCurrentReadings,
  selectCurrentStreak,
  selectCurrentStreakName,
  selectAnsweredCount,
  selectCorrectCount,
  selectIncorrectCount,
  selectIgnoredCount,
};
