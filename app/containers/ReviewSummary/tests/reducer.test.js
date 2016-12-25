
import ReviewSummaryReducer from '../reducer';
import { fromJS } from 'immutable';

describe('ReviewSummaryReducer', () => {
  it('returns the initial state', () => {
    expect(ReviewSummaryReducer(undefined, {})).toEqual(fromJS({}));
  });
});
