import {
  LOAD_USERDATA,
  LOAD_USERDATA_SUCCESS,
  LOAD_USERDATA_ERROR,
} from '../constants';

import {
  loadUserData,
  userDataLoaded,
  userDataLoadingError,
} from '../actions';

describe('App Actions', () => {
  describe('loadUserData', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOAD_USERDATA,
        showIndicator: true,
      };

      expect(loadUserData()).toEqual(expectedResult);
    });
  });

  describe('userDataLoaded', () => {
    it('should return the correct type and the passed userData', () => {
      const fixture = ['Test'];
      const expectedResult = {
        type: LOAD_USERDATA_SUCCESS,
        payload: fixture,
      };

      expect(userDataLoaded(fixture)).toEqual(expectedResult);
    });
  });

  describe('userDataLoadingError', () => {
    it('should return the correct type and the error', () => {
      const fixture = {
        title: 'Connection error!',
        message: '403 forbidden',
      };
      const expectedResult = {
        type: LOAD_USERDATA_ERROR,
        payload: fixture,
      };

      expect(userDataLoadingError(fixture)).toEqual(expectedResult);
    });
  });
});
