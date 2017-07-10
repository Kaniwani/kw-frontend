import { createActions } from 'redux-actions';

const actionParams = [
  (payload) => payload,
  (payload, meta) => meta,
];

const SYNC = actionParams;

const ASYNC = {
  REQUEST: actionParams,
  SUCCESS: actionParams,
  CANCEL: actionParams,
  FAILURE: actionParams,
};

// import actions from './actions'
// dispatch:
// actions.user.load.success(payload, meta) === { type 'APP/USER/LOAD/SUCCESS', payload: payload, meta: meta }
// read type via automatic toString():
// actions.user.load.success === 'APP/USER/LOAD/SUCCESS'
export const { app } = createActions({
  APP: {
    SETTINGS: {
      // FIXME: put expandedCards in summarysection && vocablevel reducer so all 4 can be independent
      VOCABULARY: {
        EXPANDED: {
          TOGGLE: SYNC,
        },
      },
    },
    USER: {
      LOAD: ASYNC,
    },
    REVIEWS: {
      QUEUE: {
        LOAD: ASYNC,
      },
      CURRENT: {
        SET: SYNC,
        RETURN: SYNC,
      },
    },
    LESSONS: {
      QUEUE: {
        LOAD: ASYNC,
      },
      CURRENT: {
        SET: SYNC,
        RETURN: SYNC,
      },
    },
    LEVELS: {
      LOAD: ASYNC,
    },
    LEVEL: {
      LOAD: ASYNC,
      LOCK: ASYNC,
      UNLOCK: ASYNC,
    },
    REVIEW: {
      LOAD: ASYNC,
      LOCK: ASYNC,
      UNLOCK: ASYNC,
      SYNONYM: {
        ADD: ASYNC,
        REMOVE: ASYNC,
      },
    },
  },
});

export default app;
