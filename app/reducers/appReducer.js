import { handleActions } from 'redux-actions';

import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = {
  fromPath: '',
};

let fromPath = '';

const appReducer = handleActions(
  {
    [LOCATION_CHANGE]: (state, action) => {
      const prevPath = fromPath;
      fromPath = action.payload.pathname;
      return { ...state, fromPath: prevPath };
    },
  },
  initialState
);

export default appReducer;
