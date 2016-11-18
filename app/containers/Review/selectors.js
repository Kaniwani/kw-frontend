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
  (substate) => substate.get('reviews').toJS()
);

const selectCurrentReview = () => createSelector(
  selectReviewDomain(),
  (substate) => substate.get('current').toJS()
);

const selectProgress = () => createSelector(
  selectReviewDomain(),
  (substate) => substate.get('progress').toJS()
);

const selectCompletedCount = () => createSelector(
  selectReviewDomain(),
  (substate) => substate.get('completed').size
);

const selectTotal = () => createSelector(
  selectReviewDomain(),
  (substate) => substate.get('total')
);

export {
  selectReviewDomain,
  selectError,
  selectLoading,
  selectReviews,
  selectProgress,
  selectTotal,
  selectCompletedCount,
  selectCurrentReview,
};
