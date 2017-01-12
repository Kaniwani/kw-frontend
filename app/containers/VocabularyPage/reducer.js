import { fromJS } from 'immutable';
import * as VOCAB from './constants';

// TODO: try a record?
const initialState = fromJS({
  loading: false,
  error: null,
  levels: [],
  items: [],
  item: {},
});

function vocabularyPageReducer(state = initialState, action) {
  switch (action.type) {
    case VOCAB.LOAD_LEVELS:
      return state
        .set('loading', true)
        .set('error', false);
    case VOCAB.LOAD_LEVELS_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .mergeIn(['levels'], action.payload);
    case VOCAB.LOAD_LEVELS_ERROR:
      return state
        .set('error', action.payload)
        .set('loading', false);
    case VOCAB.LOAD_ITEMS:
      return state
        .set('loading', true)
        .set('error', false);
    case VOCAB.LOAD_ITEMS_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .mergeIn(['items'], action.payload.items);
    case VOCAB.LOAD_ITEMS_ERROR:
      return state
        .set('error', action.payload)
        .set('loading', false);
    case VOCAB.LOAD_ITEM:
      return state
        .set('loading', true)
        .set('error', false);
    case VOCAB.LOAD_ITEM_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .mergeIn(['item'], action.payload);
    case VOCAB.LOAD_ITEM_ERROR:
      return state
        .set('error', action.payload)
        .set('loading', false);
    default:
      return state;
  }
}

export default vocabularyPageReducer;
