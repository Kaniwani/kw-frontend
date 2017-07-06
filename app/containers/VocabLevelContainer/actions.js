import actionTypeCreator, { ASYNC, SYNC } from 'redux-action-types-creator';
import { createAction } from 'redux-actions';

export const TYPES = actionTypeCreator('APP/VOCABLEVELCONTAINER', { asyncSuffix: ['REQUEST', 'SUCCESS', 'FAILURE', 'CANCEL'] })({
  DEFAULT: ASYNC, // load, success, failure, cancel
  ANOTHER: SYNC, //
});

export const defaultLoad = createAction(TYPES.DEFAULT.LOAD, (payload) => payload, (payload, meta) => meta);
export const defaultLoadSuccess = createAction(TYPES.DEFAULT.SUCCESS); // auto identity for payload: action(payloadVal)
export const defaultLoadFailure = createAction(TYPES.DEFAULT.FAILURE);
export const defaultLoadCancel = createAction(TYPES.DEFAULT.CANCEL);
