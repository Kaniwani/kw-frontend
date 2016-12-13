
import summaryPageReducer from '../reducer';
import { fromJS } from 'immutable';

describe('summaryPageReducer', () => {
  it('returns the initial state', () => {
    expect(summaryPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
