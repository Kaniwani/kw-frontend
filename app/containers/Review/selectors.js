import { createSelector } from 'reselect';

/**
 * Direct selector to the review state domain
 */
const selectReviewDomain = () => (state) => state.get('review');

/**
 * Other specific selectors
 */
const selectLoading = () => createSelector(
  selectReviewDomain(),
  (substate) => substate.get('loading')
);

const selectError = () => createSelector(
  selectReviewDomain(),
  (substate) => substate.get('error')
);

const selectReviews = () => createSelector(
  selectReviewDomain(),
  (substate) => substate.get('reviews')
);

const selectCurrent = () => createSelector(
  selectReviewDomain(),
  (substate) => substate.get('current')
);

const selectCurrentVocab = () => createSelector(
  selectCurrent(),
  (substate) => substate.get('vocabulary')
);

const selectCurrentStreak = () => createSelector(
  selectCurrent(),
  (substate) => substate.get('streak')
);

const selectCurrentMeaning = () => createSelector(
  selectCurrent(),
  (substate) => substate.getIn(['vocabulary', 'meaning'])
);

const selectCompleted = () => createSelector(
  selectReviewDomain(),
  (substate) => substate.get('completed')
);

const selectReviewsCount = () => createSelector(
  selectReviews(),
  (substate) => substate.size
);

const selectCompletedCount = () => createSelector(
  selectCompleted(),
  (completed) => completed.size
);

const selectCorrectCount = () => createSelector(
  selectCompleted(),
  (completed) => completed.filter((reviewItem) => !!reviewItem.getIn(['session', 'correct'])).size
);

const selectTotalCount = () => createSelector(
  selectReviewDomain(),
  (substate) => substate.get('total')
);

export {
  selectReviewDomain,
  selectError,
  selectLoading,
  selectReviews,
  selectCurrent,
  selectCurrentVocab,
  selectCurrentMeaning,
  selectCurrentStreak,
  selectReviewsCount,
  selectTotalCount,
  selectCompletedCount,
  selectCorrectCount,
};
