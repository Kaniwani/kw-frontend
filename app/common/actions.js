import { createActions } from 'redux-actions';

// optional meta as 2nd arg
const actionSignature = [(payload) => payload, (payload, meta) => meta];

// { type: TYPE, payload [, meta ] }
export const SYNC = actionSignature;

// { type: TYPE.REQUEST|SUCCESS|FAILURE, payload [, meta ] }
export const ASYNC = {
  REQUEST: actionSignature,
  SUCCESS: actionSignature,
  FAILURE: actionSignature,
  // CANCEL: actionSignature,
};

export const { app } = createActions({
  APP: {
    SET_MAINTENANCE: SYNC,
  },
});
