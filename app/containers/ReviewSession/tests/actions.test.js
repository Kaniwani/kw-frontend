
import {
  loadReviewData,
  reviewDataLoaded,
  reviewDataLoadingError,
  setNewCurrent,
  returnCurrentToQueue,
  copyCurrentToCompleted,
  increaseCurrentStreak,
  decreaseCurrentStreak,
  resetCurrentStreak,
  increaseSessionCorrect,
  increaseSessionIncorrect,
} from '../actions';

import {
  LOAD_REVIEWDATA,
  LOAD_REVIEWDATA_SUCCESS,
  LOAD_REVIEWDATA_ERROR,
  SET_NEW_CURRENT,
  RETURN_CURRENT_TO_QUEUE,
  COPY_CURRENT_TO_COMPLETED,
  INCREASE_SESSION_CORRECT,
  INCREASE_SESSION_INCORRECT,
  INCREASE_CURRENT_STREAK,
  DECREASE_CURRENT_STREAK,
  RESET_CURRENT_STREAK,
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
        payload: fixture,
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
        payload: fixture,
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

  describe('returnCurrentToQueue', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: RETURN_CURRENT_TO_QUEUE,
      };
      expect(returnCurrentToQueue()).toEqual(expectedResult);
    });
  });

  describe('copyCurrentToCompleted', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: COPY_CURRENT_TO_COMPLETED,
      };
      expect(copyCurrentToCompleted()).toEqual(expectedResult);
    });
  });

  describe('increaseCurrentStreak', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: INCREASE_CURRENT_STREAK,
      };
      expect(increaseCurrentStreak()).toEqual(expectedResult);
    });
  });

  describe('decreaseCurrentStreak', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: DECREASE_CURRENT_STREAK,
      };
      expect(decreaseCurrentStreak()).toEqual(expectedResult);
    });
  });

  describe('resetCurrentStreak', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: RESET_CURRENT_STREAK,
      };
      expect(resetCurrentStreak()).toEqual(expectedResult);
    });
  });

  describe('increaseSessionCorrect', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: INCREASE_SESSION_CORRECT,
      };
      expect(increaseSessionCorrect()).toEqual(expectedResult);
    });
  });

  describe('increaseSessionIncorrect', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: INCREASE_SESSION_INCORRECT,
      };
      expect(increaseSessionIncorrect()).toEqual(expectedResult);
    });
  });
});