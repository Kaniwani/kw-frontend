import {
  DEFAULT_ACTION,
} from './constants';

const initialState = {};

function vocabLevelPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default vocabLevelPageReducer;
