import { handleActions } from 'redux-actions';

import { LOCATION_CHANGE } from 'react-router-redux';
import { app } from 'common/actions';

const initialState = {
  fromPath: '',
  maintenance: false,
};

let fromPath = '';

const appReducer = handleActions(
  {
    [app.setMaintenance]: (state, action) => ({
      ...state,
      maintenance: action.payload,
    }),
    [LOCATION_CHANGE]: (state, action) => {
      const prevPath = fromPath;
      fromPath = action.payload.pathname;
      return { ...state, fromPath: prevPath };
    },
  },
  initialState
);

export default appReducer;
