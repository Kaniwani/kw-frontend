
import { fromJS } from 'immutable';
import {
  UPDATE_INPUT,
} from './constants';

// TODO: the state currently in review Reducer?
const initialState = fromJS({});

function answerInputReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_INPUT:
      // TODO: when state scoped to answer state only
      // return state.set('inputText', action.payload);
      return state.setIn(['answer', 'inputText'], action.payload);
    default:
      return state;
  }
}

export default answerInputReducer;
