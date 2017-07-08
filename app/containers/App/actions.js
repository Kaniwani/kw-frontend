import { createActions } from 'redux-actions';

const ASYNC = {
  REQUEST: undefined, // undefined results in identity fn(payload, meta) => { type: "TYPE", payload, meta }
  SUCCESS: undefined,
  FAILURE: undefined, // if payload is an error, redux-actions will add { error: true }
  CANCEL: undefined,
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
