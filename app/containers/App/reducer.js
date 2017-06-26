import { handleActions } from 'redux-actions';
import { TYPES } from './actions';

const initialState = {
  user: {},
  loading: false,
  error: false,
};

const appReducer = handleActions({
  [TYPES.USER.LOAD]: (state, { payload, error }) => {
    if (error) return { ...state, error };
    return { ...state, user: payload };
  },
}, initialState);

export default appReducer;
