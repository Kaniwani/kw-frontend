
import answerInputReducer from '../reducer';
import { fromJS } from 'immutable';

describe('answerInputReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({});
  });

  it('should return the initial state', () => {
    expect(answerInputReducer(undefined, {})).toEqual(state);
  });
});
