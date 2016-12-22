import { fromJS } from 'immutable';
import {
  TOGGLE_VOCAB_INFO,
  TOGGLE_VOCAB_INFO_DEPTH,
  SHOW_VOCAB_INFO,
  HIDE_VOCAB_INFO,
} from './constants';

export const reviewInfoInitialState = fromJS({
  infoVisible: false,
  fullDetails: true,
});

function reviewInfoReducer(state = reviewInfoInitialState, action) {
  switch (action.type) {
    case TOGGLE_VOCAB_INFO:
      return state.set('infoVisible', !state.get('infoVisible'));
    case TOGGLE_VOCAB_INFO_DEPTH:
      return state.set('fullDetails', !state.get('fullDetails'));
    case SHOW_VOCAB_INFO:
      return state.set('infoVisible', true);
    case HIDE_VOCAB_INFO:
      return state.set('infoVisible', false);
    default:
      return state;
  }
}

export default reviewInfoReducer;
