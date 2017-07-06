import actionTypeCreator, { /* ASYNC*/ } from 'redux-action-types-creator';
// import { createAction } from 'redux-actions';

export const TYPES = actionTypeCreator('APP/HOMEPAGE', { asyncSuffix: ['REQUEST', 'SUCCESS', 'FAILURE', 'CANCEL'] })({
//  USER: ASYNC, // request, success, failure, cancel
});
//
// export const userLoad = createAction(TYPES.USER.LOAD, (payload) => payload, (payload, meta) => meta);
// export const userLoadSuccess = createAction(TYPES.USER.SUCCESS); // auto identity for payload: action(payloadVal)
// export const userLoadFailure = createAction(TYPES.USER.FAILURE);
// export const userLoadCancel = createAction(TYPES.USER.CANCEL);
