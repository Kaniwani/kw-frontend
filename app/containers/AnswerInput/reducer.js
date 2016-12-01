/*
 * AnswerInput reducer
 */

import {
  UPDATE_INPUT,
} from './constants';

function answerInputReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_INPUT:
      return state.setIn(['answer', 'inputText'], action.text);
    default:
      return state;
  }
}

export default answerInputReducer;
