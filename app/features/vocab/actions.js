import { createActions } from 'redux-actions';
import { SYNC, ASYNC } from 'common/actions';

export const { vocab } = createActions({
  VOCAB: {
    REPORT: ASYNC,
    BATCH_UPDATE: SYNC,
    LEVELS: {
      LOAD: ASYNC,
    },
    LEVEL: {
      LOAD: ASYNC,
      LOCK: ASYNC,
      UNLOCK: ASYNC,
    },
  },
});

export default vocab;
