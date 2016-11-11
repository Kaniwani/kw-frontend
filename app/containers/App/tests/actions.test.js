import expect from 'expect';

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
      };

      expect(loadUserData()).toEqual(expectedResult);
    });
  });

  describe('userDataLoaded', () => {
    it('should return the correct type and the passed userData', () => {
      const fixture = ['Test'];
      const username = 'test';
      const expectedResult = {
        type: LOAD_USERDATA_SUCCESS,
        userData: fixture,
        username,
      };

      expect(userDataLoaded(fixture, username)).toEqual(expectedResult);
    });
  });

  describe('userDataLoadingError', () => {
    it('should return the correct type and the error', () => {
      const fixture = {
        msg: 'Something went wrong!',
      };
      const expectedResult = {
        type: LOAD_USERDATA_ERROR,
        error: fixture,
      };

      expect(userDataLoadingError(fixture)).toEqual(expectedResult);
    });
  });
});
