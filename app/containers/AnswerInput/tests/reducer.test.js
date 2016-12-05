import { fromJS } from 'immutable';
import answerInputReducer from '../reducer';
import {
  UPDATE_INPUT,
} from '../constants';

describe('answerInputReducer', () => {
  it('should return the initial state', () => {
    const testState = undefined;
    const expectedState = fromJS({});
    const action = {};
    expect(answerInputReducer(testState, action)).toEqual(expectedState);
  });
  it('should update the input', () => {
    const testState = fromJS({ answer: { inputText: '' } });
    const expectedState = fromJS({ answer: { inputText: 'fhqwhqgads' } });
    const action = {
      type: UPDATE_INPUT,
      payload: 'fhqwhqgads',
    };
    expect(answerInputReducer(testState, action)).toEqual(expectedState);
  });
});
