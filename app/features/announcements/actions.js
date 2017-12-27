import { createActions } from "redux-actions";
import { ASYNC } from "common/actions";

export const { announcements } = createActions({
  ANNOUNCEMENTS: {
    LOAD: ASYNC,
  },
});

export default announcements;
