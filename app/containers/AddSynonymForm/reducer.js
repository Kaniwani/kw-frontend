import { fromJS } from 'immutable';
import {
  LOAD_JISHODATA,
  LOAD_JISHODATA_SUCCESS,
  LOAD_JISHODATA_ERROR,
} from './constants';

const AddSynonymInitialState = fromJS({
  input: {
    characters: null,
    kana: null,
    isValid: false,
  },
  jisho: null,
  loading: false,
  error: false,
});

function addSynonymFormReducer(state = AddSynonymInitialState, action) {
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
