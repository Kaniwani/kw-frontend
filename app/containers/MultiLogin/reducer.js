import { handleActions } from 'redux-actions';

import { PANELS } from './constants';
import multiLogin from './actions';

const initialState = {
  activePanel: PANELS[1],
};

const multiLoginReducer = handleActions({
  [multiLogin.setActivePanel]: (state, { payload }) => ({ activePanel: payload }),
}, initialState);

export default multiLoginReducer;
