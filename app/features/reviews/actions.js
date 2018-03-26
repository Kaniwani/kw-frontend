import { createActions } from 'redux-actions';
import { SYNC, ASYNC } from 'common/actions';

export const { review } = createActions({
  REVIEW: {
    LOAD: ASYNC,
    LOCK: ASYNC,
    UNLOCK: ASYNC,
    UPDATE: SYNC,
    BATCH_UPDATE: SYNC,
    UPDATE_NOTES: ASYNC,
  },
});

export default review;
