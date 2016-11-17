import expect from 'expect';
import {
  loadReviewData,
  reviewDataLoaded,
  reviewDataLoadingError,
  rotateCurrentReview,
} from '../actions';
import {
  LOAD_REVIEWDATA,
  LOAD_REVIEWDATA_SUCCESS,
  LOAD_REVIEWDATA_ERROR,
  ROTATE_CURRENT_REVIEW,
} from '../constants';


describe('Review actions', () => {
  describe('loadReviewData', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOAD_REVIEWDATA,
      };

      expect(loadReviewData()).toEqual(expectedResult);
    });
  });

  describe('reviewDataLoaded', () => {
    it('should return the correct type and the passed data', () => {
      const fixture = {};
      const expectedResult = {
        type: LOAD_REVIEWDATA_SUCCESS,
        reviewData: fixture,
      };

      expect(reviewDataLoaded(fixture)).toEqual(expectedResult);
    });
  });

  describe('reviewDataLoadingError', () => {
    it('should return the correct type and the error', () => {
      const fixture = {
        msg: 'Something went wrong!',
      };
      const expectedResult = {
        type: LOAD_REVIEWDATA_ERROR,
        error: fixture,
      };


      expect(reviewDataLoadingError(fixture)).toEqual(expectedResult);
    });
  });

  describe('rotateCurrentReview', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: ROTATE_CURRENT_REVIEW,
      };

      expect(rotateCurrentReview()).toEqual(expectedResult);
    });
  });
});
