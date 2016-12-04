
import { fromJS } from 'immutable';
import {
  UPDATE_INPUT,
} from './constants';

function answerInputReducer(state = fromJS({}), action) {
  switch (action.type) {
    case UPDATE_INPUT:
      return state.setIn(['answer', 'inputText'], action.data);
    default:
      return state;
  }
}

export default answerInputReducer;
