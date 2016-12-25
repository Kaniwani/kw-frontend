import { fromJS } from 'immutable';
import {
  // LOAD_JISHODATA,
  // LOAD_JISHODATA_SUCCESS,
  // LOAD_JISHODATA_ERROR,
  ADD_SYNONYM_ERROR,
} from './constants';

export const addSynonymInitialState = fromJS({
  // jisho: {
  //   data: null,
  //   loading: false,
  //   error: false,
  // },
  form: {
    valid: true,
    error: false,
  },
});

function addSynonymReducer(state = addSynonymInitialState, action) {
  switch (action.type) {
    // case ADD_SYNONYM:
    //   return state
    //     .set('loading', true)
    //     .set('error', false);
    // case ADD_SYNONYM_SUCCESS: {
    //   return state
    //     .set('jisho', action.payload)
    //     .set('loading', false);
    // }
    case ADD_SYNONYM_ERROR:
      return state
        .setIn(['form', 'error'], action.payload)
        .setIn(['form', 'loading'], false);
    // case LOAD_JISHODATA:
    //   return state
    //     .setIn(['jisho', 'loading'], true)
    //     .setIn(['jisho', 'error'], false);
    // case LOAD_JISHODATA_SUCCESS:
    //   return state
    //     .setIn(['jisho', 'data'], action.payload)
    //     .setIn(['jisho', 'loading'], false);
    // case LOAD_JISHODATA_ERROR:
    //   return state
    //     .setIn(['jisho', 'error'], action.payload)
    //     .setIn(['jisho', 'loading'], false);
    default:
      return state;
  }
}

export default addSynonymReducer;
