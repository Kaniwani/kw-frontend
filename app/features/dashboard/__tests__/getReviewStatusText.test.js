import { addHours } from 'date-fns';
import { getReviewStatusText } from 'features/dashboard/ReviewStatus';

const defaults = {
  isOnVacation: false,
  isLoading: false,
  reviewsCount: 0,
  vacationDate: false,
  nextReviewDate: false,
  freshUser: false,
  loadQuizCounts: () => {},
};

describe('getReviewStatusText()', () => {
  it('sane default', () => {
    expect(getReviewStatusText()).toMatchSnapshot();
  });
  it('no reviews unlocked', () => {
    expect(getReviewStatusText({ ...defaults, freshUser: true })).toMatchSnapshot();
  });
  it('on vacation', () => {
    expect(
      getReviewStatusText({
        ...defaults,
        isOnVacation: true,
        reviewsCount: 40,
        vacationDate: new Date(2017, 11, 26), // Dec 26 2017
      })
    ).toMatchSnapshot();
  });
  it('has reviews ready', () => {
    expect(
      getReviewStatusText({
        ...defaults,
        reviewsCount: 1,
      })
    ).toMatchSnapshot();
  });
  it('review date is future', () => {
    expect(
      getReviewStatusText({
        ...defaults,
        nextReviewDate: addHours(new Date(), 2),
      })
    ).toMatchSnapshot();
  });
  it('review date is past', () => {
    expect(
      getReviewStatusText({
        ...defaults,
        nextReviewDate: addHours(new Date(), -2),
      })
    ).toMatchSnapshot();
  });
  it('user is loading', () => {
    expect(
      getReviewStatusText({
        ...defaults,
        isLoading: true,
      })
    ).toMatchSnapshot();
  });
});
