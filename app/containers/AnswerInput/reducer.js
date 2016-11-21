/*
 * AnswerInput reducer
 */

import {
  CHANGE_INPUT,
} from './constants';

function answerInputReducer(state = {}, action) {
  switch (action.type) {
    case CHANGE_INPUT:
      return state.setIn(['answer', 'inputText'], action.text);
    default:
      return state;
  }
}

export default answerInputReducer;
