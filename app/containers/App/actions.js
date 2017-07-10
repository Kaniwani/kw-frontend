import { createActions } from 'redux-actions';

const ASYNC = {
  REQUEST: undefined,
  SUCCESS: undefined,
  CANCEL: undefined,
  FAILURE: undefined,
};

// import actions from './actions'
// dispatch:
// actions.user.load.success(payload, meta) === { type 'APP/USER/LOAD/SUCCESS', payload, meta }
// read type via automatic toString():
// actions.user.load.success === 'APP/USER/LOAD/SUCCESS'
export const { app } = createActions({
  APP: {
    USER: {
      LOAD: ASYNC,
    },
    REVIEWS: {
      LOAD: ASYNC,
    },
    QUEUE: {
      LOAD: ASYNC,
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
    },
    SYNONYM: {
      ADD: ASYNC,
      REMOVE: ASYNC,
    },
  },
});

export default app;
