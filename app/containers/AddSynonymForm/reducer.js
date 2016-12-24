import { fromJS } from 'immutable';
import {
  LOAD_JISHODATA,
  LOAD_JISHODATA_SUCCESS,
  LOAD_JISHODATA_ERROR,
} from './constants';

export const addSynonymInitialState = fromJS({
  input: {
    characters: false, // don't constantly update, only on submit to check validity
    kana: false, // don't constantly update, only on submit to check validity
    isValid: false,
  },
  jisho: false,
  loading: false,
  error: false,
});

function addSynonymReducer(state = addSynonymInitialState, action) {
  switch (action.type) {
    case LOAD_JISHODATA:
      return state
        .set('loading', true)
        .set('error', false);
    case LOAD_JISHODATA_SUCCESS: {
      return state
        .set('jisho', action.payload)
        .set('loading', false);
    }
    case LOAD_JISHODATA_ERROR:
      return state
        .set('error', action.payload)
        .set('loading', false);
    default:
      return state;
  }
}

export default addSynonymReducer;
