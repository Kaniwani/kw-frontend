import { createActions } from "redux-actions";
import { ASYNC } from "common/actions";

export const { settings } = createActions({
  SETTINGS: {
    SAVE: ASYNC,
    CHANGE_USERNAME: ASYNC,
    CHANGE_PASSWORD: ASYNC,
    RESET_PROGRESS: ASYNC,
  },
});

export default settings;
