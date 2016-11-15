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

// generic catchall
const selectReview = () => createSelector(
  selectReviewDomain(),
  (substate) => substate.toJS()
);

export default selectReview;
export {
  selectError,
  selectLoading,
  selectReviews,
  selectProgress,
  selectCurrentReview,
};
