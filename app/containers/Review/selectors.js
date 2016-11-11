import { createSelector } from 'reselect';

/**
 * Direct selector to the review state domain
 */
const selectReviewDomain = () => (state) => state.get('review');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Review
 */

const selectReview = () => createSelector(
  selectReviewDomain(),
  (substate) => substate.toJS()
);

export default selectReview;
export {
  selectReviewDomain,
};
