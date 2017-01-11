/*
 *
 * VocabularyPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_VOCAB_LEVELDATA,
  LOAD_VOCAB_LEVELDATA_SUCCESS,
  LOAD_VOCAB_LEVELDATA_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  levels: [],
});

function vocabularyPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_VOCAB_LEVELDATA:
      return state
        .set('loading', action.showIndicator)
        .set('error', false);
    case LOAD_VOCAB_LEVELDATA_SUCCESS: {
      return state
        .set('loading', false)
        .set('error', false)
        .mergeIn(['levels'], action.payload);
    }
    case LOAD_VOCAB_LEVELDATA_ERROR:
      return state
        .set('error', action.payload)
        .set('loading', false);
    default:
      return state;
  }
}

export default vocabularyPageReducer;
