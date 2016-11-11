import expect from 'expect';
import reviewReducer from '../reducer';
import { fromJS } from 'immutable';

describe('reviewReducer', () => {
  it('returns the initial state', () => {
    expect(reviewReducer(undefined, {})).toEqual(fromJS({}));
  });
});
