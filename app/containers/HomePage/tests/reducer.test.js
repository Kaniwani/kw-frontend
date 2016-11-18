import expect from 'expect';
import homeReducer from '../reducer';
// import {
//   changeUsername,
// } from '../actions';
import { fromJS } from 'immutable';

describe('homeReducer', () => {
  let state;

  beforeEach(() => {
    state = fromJS({});
  });

  it('should return the initial state', () => {
    expect(homeReducer(undefined, {})).toEqual(state);
  });

  // it('should handle the changeUsername action correctly', () => {
  //   const fixture = 'mxstbr';
  //   const expectedResult = state.set('username', fixture);

  //   expect(homeReducer(state, changeUsername(fixture))).toEqual(expectedResult);
  // });
});
