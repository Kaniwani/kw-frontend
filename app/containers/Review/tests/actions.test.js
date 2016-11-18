import expect from 'expect';
import {
  loadReviewData,
  reviewDataLoaded,
  reviewDataLoadingError,
  setNewCurrent,
} from '../actions';
import {
  LOAD_REVIEWDATA,
  LOAD_REVIEWDATA_SUCCESS,
  LOAD_REVIEWDATA_ERROR,
  SET_NEW_CURRENT,
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
      const fixture = {
        count: 2,
        reviews: [],
      };
      const expectedResult = {
        type: LOAD_REVIEWDATA_SUCCESS,
        data: fixture,
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

  describe('setNewCurrent', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: SET_NEW_CURRENT,
      };

      expect(setNewCurrent()).toEqual(expectedResult);
    });
  });
});
