import { fromJS } from 'immutable';
import { ReviewEntryRecord } from 'shared/models';
import * as VOCAB from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  levels: [],
  items: [],
  item: new ReviewEntryRecord({}),
});

function vocabularyPageReducer(state = initialState, action) {
  switch (action.type) {
    case VOCAB.LOAD_LEVELS:
    case VOCAB.LOAD_ITEMS:
    case VOCAB.LOAD_ITEM:
      return state.merge({ loading: true, error: false });
    case VOCAB.LOAD_LEVELS_ERROR:
    case VOCAB.LOAD_ITEMS_ERROR:
    case VOCAB.LOAD_ITEM_ERROR:
      return state.merge({ loading: false, error: action.payload });
    case VOCAB.LOAD_LEVELS_SUCCESS:
      return state
        .merge({ loading: false, error: false })
        .mergeIn(['levels'], action.payload);
    case VOCAB.LOAD_ITEMS_SUCCESS:
      return state
        .merge({ loading: false, error: false })
        .mergeIn(['items'], action.payload);
    case VOCAB.LOAD_ITEM_SUCCESS:
      return state
        .merge({ loading: false, error: false })
        .mergeIn(['item'], action.payload);
    default:
      return state;
  }
}

export default vocabularyPageReducer;
