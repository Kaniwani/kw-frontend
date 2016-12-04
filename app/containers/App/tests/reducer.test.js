
import appReducer from '../reducer';
import {
  loadUserData,
  userDataLoaded,
  userDataLoadingError,
} from '../actions';
import { fromJS } from 'immutable';

describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      loading: false,
      error: false,
      userData: fromJS({
        userData: false,
      }),
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadUserData action correctly', () => {
    const expectedResult = state
      .set('loading', true)
      .set('error', false)
      .setIn(['userData', 'userData'], false);

    expect(appReducer(state, loadUserData())).toEqual(expectedResult);
  });

  it('should handle the userDataLoaded action correctly', () => {
    const fixture = [{
      name: 'Test Username',
    }];
    const username = 'test';
    const expectedResult = state
      .setIn(['userData', 'userData'], fixture)
      .set('loading', false)
      .set('currentUser', username);

    expect(appReducer(state, userDataLoaded(fixture, username))).toEqual(expectedResult);
  });

  it('should handle the userDataLoadingError action correctly', () => {
    const fixture = {
      msg: 'Not found',
    };
    const expectedResult = state
      .set('error', fixture)
      .set('loading', false);

    expect(appReducer(state, userDataLoadingError(fixture))).toEqual(expectedResult);
  });
});
