import { handleActions, combineActions } from 'redux-actions';

import actions from './actions';

export const initialState = [];

export const notificationsReducer = handleActions(
  {
    [combineActions(actions.success, actions.info, actions.warning, actions.error)]: (
      state,
      { payload }
    ) => [...state, payload],
    [actions.remove]: (state, { payload }) => state.filter((item) => item.id !== payload.id),
  },
  initialState
);

export default notificationsReducer;
