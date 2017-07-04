import { createActions } from 'redux-actions';

const ASYNC = {
  REQUEST: [
    (payload) => payload,
    (payload, meta) => meta,
  ], // { type: "TYPE", payload, meta }
  SUCCESS: undefined, // undefined results in simple identity fn(payload) => { type: "TYPE", payload }
  FAILURE: undefined, // if payload is an error, redux-actions will add { error: true }
  CANCEL: undefined,
};

export const { session } = createActions({
  SESSION: {
    QUEUE: {
      LOAD: ASYNC,
    },
  },
});

export default session;
