import { fromJS } from 'immutable';
import expect from 'expect';
import {
  selectReviewDomain,
  selectError,
  selectLoading,
  selectReviews,
  selectCompleted,
  selectTotalCount,
  selectCompletedCount,
  selectCurrentReview,
} from '../selectors';

describe('selectReviewDomain', () => {
  const testSelector = selectReviewDomain();

  it('should select the review state', () => {
    const reviewState = fromJS({
      reviews: [],
    });

    const mockedState = fromJS({
      review: reviewState,
    });

    expect(testSelector(mockedState)).toEqual(reviewState);
  });
});

describe('selectReviews', () => {
  const testSelector = selectReviews();

  it('should select the reviews state', () => {
    const reviewsState = [];
    const mockedState = fromJS({
      review: {
        reviews: reviewsState,
      },
    });
    expect(testSelector(mockedState)).toEqual(reviewsState);
  });
});

describe('selectError', () => {
  const testSelector = selectError();

  it('should select the selectError state', () => {
    const errorState = null;
    const mockedState = fromJS({
      review: {
        error: errorState,
      },
    });
    expect(testSelector(mockedState)).toEqual(errorState);
  });
});


describe('selectLoading', () => {
  const testSelector = selectLoading();

  it('should select the selectLoading state', () => {
    const loadingState = null;
    const mockedState = fromJS({
      review: {
        loading: loadingState,
      },
    });
    expect(testSelector(mockedState)).toEqual(loadingState);
  });
});


describe('selectCompleted', () => {
  const testSelector = selectCompleted();

  it('should select the selectCompleted state', () => {
    const completedState = fromJS([{ id: 0 }]);
    const mockedState = fromJS({
      review: {
        completed: completedState,
      },
    });
    expect(testSelector(mockedState)).toEqual(completedState);
  });
});


describe('selectTotalCount', () => {
  const testSelector = selectTotalCount();

  it('should select the selectTotalCount state', () => {
    const totalState = 1;
    const mockedState = fromJS({
      review: {
        total: totalState,
      },
    });
    expect(testSelector(mockedState)).toEqual(totalState);
  });
});


describe('selectCompletedCount', () => {
  const testSelector = selectCompletedCount();

  it('should select the selectCompletedCount state', () => {
    const completedCountState = 2;
    const mockedState = fromJS({
      review: {
        completed: [{ id: 0 }, { id: 1 }],
      },
    });
    expect(testSelector(mockedState)).toEqual(completedCountState);
  });
});


describe('selectCurrentReview', () => {
  const testSelector = selectCurrentReview();

  it('should select the selectCurrentReview state', () => {
    const currentReviewState = { id: 1 };
    const mockedState = fromJS({
      review: {
        current: currentReviewState,
      },
    });
    expect(testSelector(mockedState)).toEqual(currentReviewState);
  });
});

