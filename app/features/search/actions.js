import { createActions } from "redux-actions";
import { SYNC, ASYNC } from "common/actions";

export const { search } = createActions({
  SEARCH: {
    QUERY: ASYNC,
    CLEAR: SYNC,
  },
});

export default search;
