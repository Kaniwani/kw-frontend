import reviewInfoReducer, { reviewInfoInitialState } from '../reducer';
// import { fromJS } from 'immutable';

describe('reviewInfoReducer', () => {
  it('returns the initial state', () => {
    expect(reviewInfoReducer(undefined, {})).toEqual(reviewInfoInitialState);
  });
});
