import { createActions } from "redux-actions";
import { ASYNC } from "common/actions";

export const { contact } = createActions({
  CONTACT: {
    SEND: ASYNC,
  },
});

export default contact;
