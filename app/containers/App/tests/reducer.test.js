import appReducer, { initialState } from '../reducer';
import { fromJS } from 'immutable';
import {
  loadUserData,
  userDataLoaded,
  userDataLoadingError,
} from '../actions';

describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadUserData action correctly', () => {
    const expectedResult = state
      .set('loading', true)
      .set('error', false);

    expect(appReducer(state, loadUserData())).toEqual(expectedResult);
  });

  it('should handle the userDataLoaded action correctly', () => {
    const fixture = fromJS({
      name: 'Test Username',
    });
    const username = 'test';
    const expectedResult = state
      .set('user', fixture)
      .set('loading', false);

    expect(appReducer(state, userDataLoaded(fixture, username))).toEqual(expectedResult);
  });

  it('should handle the userDataLoadingError action correctly', () => {
    const fixture = fromJS({
      msg: 'Not found',
    });
    const expectedResult = state
      .set('error', fixture)
      .set('loading', false);

    expect(appReducer(state, userDataLoadingError(fixture))).toEqual(expectedResult);
  });
});
