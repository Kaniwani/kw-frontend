import addHours from 'date-fns/add_hours';
import subHours from 'date-fns/sub_hours';
import getReviewStatusText from '../getReviewStatusText';

describe('getReviewStatusText()', () => {
  it('should have sane default', () => {
    expect(getReviewStatusText({})).toMatchSnapshot();
  });
  it('on vacation', () => {
    expect(getReviewStatusText({
      vacationDate: new Date(2017, 11, 26), // Dec 26 2017
      reviewsCount: 40,
      nextReviewDate: false,
    })).toMatchSnapshot();
  });
  it('no reviews unlocked', () => {
    expect(getReviewStatusText({ reviewsCount: 0, nextReviewDate: false })).toMatchSnapshot();
  });
  it('review date is past', () => {
    expect(getReviewStatusText({ reviewsCount: 0, nextReviewDate: subHours(new Date(), 2) })).toMatchSnapshot();
  });
  it('review date is future', () => {
    expect(getReviewStatusText({ reviewsCount: 0, nextReviewDate: addHours(new Date(), 2) })).toMatchSnapshot();
  });
});
