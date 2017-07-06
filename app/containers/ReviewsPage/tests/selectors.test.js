import selectReviewsPageDomain, { makeSelectReviewsPage } from '../selectors';

describe('ReviewsPage selectors', () => {
  const state = { reviewsPage: 'winner!' };
  const ReviewsPageDomain = selectReviewsPageDomain()(state);
  const selectReviewsPage = makeSelectReviewsPage();

  it('selecting reviewsPage domain state should match snapshot', () => {
    expect(ReviewsPageDomain).toMatchSnapshot();
  });

  it('selecting reviewsPage substate should match snapshot', () => {
    expect(selectReviewsPage(state)).toMatchSnapshot();
  });
});
