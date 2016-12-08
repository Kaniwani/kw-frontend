/*
 *
 * ReviewInfo reducer
 *
 */

import { fromJS } from 'immutable';
import {
  TOGGLE_VOCAB_INFO,
  SHOW_VOCAB_INFO,
  HIDE_VOCAB_INFO,
} from './constants';

export const reviewInfoInitialState = fromJS({
  charactersVisible: false,
  kanaVisible: false,
});

function reviewInfoReducer(state = reviewInfoInitialState, action) {
  switch (action.type) {
    case TOGGLE_VOCAB_INFO:
      return state
        .updateIn(['charactersVisible'], (value) => (action.payload.characters ? !value : value))
        .updateIn(['kanaVisible'], (value) => (action.payload.kana ? !value : value));
    case SHOW_VOCAB_INFO:
      return state.merge({
        charactersVisible: true,
        kanaVisible: true,
      });
    case HIDE_VOCAB_INFO:
      return state.merge({
        charactersVisible: false,
        kanaVisible: false,
      });
    default:
      return state;
  }
}

export default reviewInfoReducer;
