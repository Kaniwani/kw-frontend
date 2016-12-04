
import answerInputReducer from '../reducer';
import { fromJS } from 'immutable';

describe('answerInputReducer', () => {
  it('returns the initial state', () => {
    expect(answerInputReducer(undefined, {})).toEqual(fromJS({}));
  });
});
