import { fromJS } from 'immutable';
import answerInputReducer, { answerInitialState } from '../reducer';
import {
  UPDATE_INPUT,
} from '../constants';

describe('answerInputReducer', () => {
  it('should return the initial state', () => {
    const testState = undefined;
    const expectedState = answerInitialState;
    const action = {};
    expect(answerInputReducer(testState, action)).toEqual(expectedState);
  });
  it('should update the input', () => {
    const testState = fromJS({ inputText: '' });
    const expectedState = fromJS({ inputText: 'fhqwhqgads' });
    const action = {
      type: UPDATE_INPUT,
      payload: 'fhqwhqgads',
    };
    expect(answerInputReducer(testState, action)).toEqual(expectedState);
  });
});
