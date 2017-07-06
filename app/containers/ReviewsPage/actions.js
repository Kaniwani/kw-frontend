import actionTypeCreator, { ASYNC, SYNC } from 'redux-action-types-creator';
import { createAction } from 'redux-actions';

export const TYPES = actionTypeCreator(
  'APP/REVIEWSPAGE',
  { asyncSuffix: ['REQUEST', 'SUCCESS', 'FAILURE', 'CANCEL'],
  })({
    DEFAULT: {
      LOAD: ASYNC, // request, success, failure, cancel
    },
    ANOTHER: SYNC,
  });

export const defaultLoad = createAction(TYPES.DEFAULT.LOAD.REQUEST, (payload) => payload, (payload, meta) => meta);
export const defaultLoadSuccess = createAction(TYPES.DEFAULT.LOAD.SUCCESS); // auto identity for payload: action(payloadVal)
export const defaultLoadFailure = createAction(TYPES.DEFAULT.LOAD.FAILURE);
export const defaultLoadCancel = createAction(TYPES.DEFAULT.LOAD.CANCEL);
