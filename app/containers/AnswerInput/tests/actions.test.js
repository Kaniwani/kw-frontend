import {
  UPDATE_INPUT,
} from '../constants';

import {
  updateInput,
} from '../actions';


describe('AnswerInput actions', () => {
  describe('Default Action', () => {
    it('has a type of UPDATE_INPUT', () => {
      const text = 'fhqwhgads';
      const expected = {
        type: UPDATE_INPUT,
        payload: text,
      };
      expect(updateInput(text)).toEqual(expected);
    });
  });
});
