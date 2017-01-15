import { createSelector } from 'reselect';

/**
 * Direct selector to the review state domain
 */
const selectReviewDomain = (state) => state.get('review');

/**
 * Other specific selectors
 */
const selectLoading = createSelector(
  selectReviewDomain,
  (substate) => substate.loading,
);

const selectError = createSelector(
  selectReviewDomain,
  (substate) => substate.error,
);

export default selectReviewDomain;

export {
  selectError,
  selectLoading,
};
