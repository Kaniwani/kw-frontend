import { handleActions } from 'redux-actions';
import { TYPES } from './actions';

const initialState = {};

const reviewsPageReducer = handleActions({
  [TYPES.DEFAULT.LOAD]: (state) => ({ ...state, loading: true }),
  [TYPES.DEFAULT.SUCCESS]: (state, { payload }) => ({ ...state, value: payload, loading: false }),
  [TYPES.DEFAULT.FAILURE]: (state, { payload }) => ({ ...state, error: payload, loading: false }),
  [TYPES.DEFAULT.CANCEL]: (state) => ({ ...state, loading: false }),
}, initialState);

export default reviewsPageReducer;
