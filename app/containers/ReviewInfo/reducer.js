import { fromJS } from 'immutable';
import {
  TOGGLE_VOCAB_INFO,
  TOGGLE_VOCAB_INFO_DEPTH,
  SHOW_VOCAB_INFO,
  HIDE_VOCAB_INFO,
} from './constants';

export const reviewInfoInitialState = fromJS({
  infoVisible: false,
  showAll: false,
});

function reviewInfoReducer(state = reviewInfoInitialState, action) {
  switch (action.type) {
    case TOGGLE_VOCAB_INFO:
      return state.set('infoVisible', !state.get('infoVisible'));
    case SHOW_VOCAB_INFO:
      return state.set('infoVisible', true);
    case TOGGLE_VOCAB_INFO_DEPTH:
      return state.set('showAll', !state.get('showAll'));
    case HIDE_VOCAB_INFO:
      return state.set('infoVisible', false);
    default:
      return state;
  }
}

export default reviewInfoReducer;
