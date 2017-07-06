import { createSelector } from 'reselect';

const selectReviewsPageContainerDomain = () => (state) => state.reviewsPageContainer;

const makeSelectReviewsPageContainer = () => createSelector(
  selectReviewsPageContainerDomain(),
  (substate) => substate
);

export default selectReviewsPageContainerDomain;
export {
  makeSelectReviewsPageContainer,
};
