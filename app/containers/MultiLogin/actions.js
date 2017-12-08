import { createActions } from 'redux-actions';
const actionSignature = (payload) => payload;

const SYNC = actionSignature;

export const { multiLogin } = createActions({
  MULTI_LOGIN: {
    SET_ACTIVE_PANEL: SYNC,
  },
});

export default multiLogin;
