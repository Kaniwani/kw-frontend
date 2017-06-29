import { handleActions } from 'redux-actions';
import { TYPES } from './actions';
const { USER, REVIEWS } = TYPES;

const initialState = {
  loading: false,
  error: false,
};

const appReducer = handleActions({
  [USER.LOAD]: (state) => ({ ...state, loading: true }),
  [USER.SUCCESS]: (state, { payload }) => ({ ...state, ...payload, loading: false }),
  [USER.FAILURE]: (state, { payload }) => ({ ...state, error: payload, loading: false }),
  [USER.CANCEL]: (state) => ({ ...state, loading: false }),
  [REVIEWS.LOAD]: (state) => ({ ...state, loading: true }),
  [REVIEWS.SUCCESS]: (state, { payload }) => ({ ...state, reviews: payload, loading: false }),
  [REVIEWS.FAILURE]: (state, { payload }) => ({ ...state, error: payload, loading: false }),
  [REVIEWS.CANCEL]: (state) => ({ ...state, loading: false }),
}, initialState);

export default appReducer;
