import { createActions } from "redux-actions";
import { SYNC, ASYNC } from "common/actions";

export const { synonyms } = createActions({
  SYNONYMS: {
    ADD: ASYNC,
    REMOVE: ASYNC,
    BATCH_UPDATE: SYNC,
  },
});

export default synonyms;
