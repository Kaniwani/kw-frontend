import { fromJS } from 'immutable';
import {
  UPDATE_INPUT,
} from './constants';

export const answerInitialState = fromJS({
  inputText: '',
  inputDisabled: false,
  valid: null,
  marked: false,
  matches: false,
  answerType: null,
});

function answerInputReducer(state = answerInitialState, action) {
  switch (action.type) {
    case UPDATE_INPUT:
      return state.set('inputText', action.payload);
    default:
      return state;
  }
}

export default answerInputReducer;
