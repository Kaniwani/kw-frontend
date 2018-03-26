import { createActions } from 'redux-actions';
import { SYNC, ASYNC } from 'common/actions';

export const { user } = createActions({
  USER: {
    QUIZ_COUNTS: ASYNC,
    LOAD: ASYNC,
    RESET_PASSWORD: ASYNC,
    CONFIRM_RESET_PASSWORD: ASYNC,
    REGISTER: ASYNC,
    LOGIN: ASYNC,
    LOGOUT: SYNC,
  },
});

export default user;
