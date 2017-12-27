import { createActions } from "redux-actions";
import { SYNC, ASYNC } from "common/actions";

export const { user } = createActions({
  USER: {
    LOAD: ASYNC,
    RESET_PASSWORD: ASYNC,
    REGISTER: ASYNC,
    LOGIN: ASYNC,
    LOGOUT: SYNC,
  },
});

export default user;
