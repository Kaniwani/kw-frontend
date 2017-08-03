import { createActions } from 'redux-actions';

const actionSignature = (payload) => payload;

const SYNC = actionSignature;

const ASYNC = {
  REQUEST: actionSignature,
  SUCCESS: actionSignature,
  CANCEL: actionSignature,
  FAILURE: actionSignature,
};

// import actions from './actions'
// dispatch:
// actions.user.load.success(payload, meta) === { type 'APP/USER/LOAD/SUCCESS', payload: payload, meta: meta }
// read type via automatic toString():
// actions.user.load.success === 'APP/USER/LOAD/SUCCESS'
export const { app } = createActions({
  APP: {
    CLEAR_GLOBAL_STATE: SYNC,
    SETTINGS: {
      SAVE: ASYNC,
      RESET_PROGRESS: ASYNC, // USER action instead?
    },
    USER: {
      REGISTER: ASYNC,
      LOGIN: ASYNC,
      RESET_PASSWORD: ASYNC,
      LOGOUT: SYNC,
      LOAD: ASYNC,
      SRS: ASYNC,
    },
    // TODO: rename as session > reviews???
    REVIEWS: {
      RESET_SESSION: SYNC,
      QUEUE: {
        LOAD: ASYNC,
      },
      CURRENT: {
        SET: SYNC,
        RETURN: SYNC,
      },
      CORRECT: {
        ADD: SYNC,
        REMOVE: SYNC,
      },
      INCORRECT: {
        ADD: SYNC,
        REMOVE: SYNC,
      },
    },
    // TODO: rename as session > lessons???
    LESSONS: {
      RESET_SESSION: SYNC,
      QUEUE: {
        LOAD: ASYNC,
      },
      CURRENT: {
        SET: SYNC,
        RETURN: SYNC,
      },
      CORRECT: {
        ADD: SYNC,
        REMOVE: SYNC,
      },
      INCORRECT: {
        ADD: SYNC,
        REMOVE: SYNC,
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
      UPDATE: SYNC,
      NOTES: ASYNC,
      SYNONYM: {
        ADD: ASYNC,
        REMOVE: ASYNC,
      },
    },
  },
});

export default app;
