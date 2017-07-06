import { createSelector } from 'reselect';

const selectReviewsPageDomain = () => (state) => state.reviewsPage;

const makeSelectReviewsPage = () => createSelector(
  selectReviewsPageDomain(),
  (substate) => substate
);

export default selectReviewsPageDomain;
export {
  makeSelectReviewsPage,
};
