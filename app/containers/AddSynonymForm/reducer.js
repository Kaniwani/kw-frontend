import { fromJS } from 'immutable';
import {
  LOAD_JISHODATA,
  LOAD_JISHODATA_SUCCESS,
  LOAD_JISHODATA_ERROR,
} from './constants';

export const addSynonymInitialState = fromJS({
  input: {
    characters: false,
    kana: false,
    isValid: false,
  },
  jisho: false,
  loading: false,
  error: false,
});

function addSynonymFormReducer(state = addSynonymInitialState, action) {
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

export default addSynonymFormReducer;
