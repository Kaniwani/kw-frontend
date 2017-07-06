import selectReviewsPageContainerDomain, { makeSelectReviewsPageContainer } from '../selectors';

describe('ReviewsPageContainer selectors', () => {
  const state = { reviewsPageContainer: 'winner!' };
  const ReviewsPageContainerDomain = selectReviewsPageContainerDomain()(state);
  const selectReviewsPageContainer = makeSelectReviewsPageContainer();

  it('selecting reviewsPageContainer domain state should match snapshot', () => {
    expect(ReviewsPageContainerDomain).toMatchSnapshot();
  });

  it('selecting reviewsPageContainer substate should match snapshot', () => {
    expect(selectReviewsPageContainer(state)).toMatchSnapshot();
  });
});
