import actionTypeCreator, { ASYNC } from 'redux-action-types-creator';
import { createAction } from 'redux-actions';

export const TYPES = actionTypeCreator('APP', { asyncSuffix: ['LOAD', 'SUCCESS', 'FAILURE', 'CANCEL'] })({
  USER: ASYNC, // load, success, failure, cancel
  REVIEWS: ASYNC, // load, success, failure, cancel
  LEVELS: ASYNC, // load, success, failure, cancel
});

export const userLoad = createAction(TYPES.USER.LOAD);
export const userLoadSuccess = createAction(TYPES.USER.SUCCESS);
export const userLoadFailure = createAction(TYPES.USER.FAILURE);
export const userLoadCancel = createAction(TYPES.USER.CANCEL);
export const reviewsLoad = createAction(TYPES.REVIEWS.LOAD);
export const reviewsLoadSuccess = createAction(TYPES.REVIEWS.SUCCESS);
export const reviewsLoadFailure = createAction(TYPES.REVIEWS.FAILURE);
export const reviewsLoadCancel = createAction(TYPES.REVIEWS.CANCEL);
export const levelsLoad = createAction(TYPES.LEVELS.LOAD);
export const levelsLoadSuccess = createAction(TYPES.LEVELS.SUCCESS);
export const levelsLoadFailure = createAction(TYPES.LEVELS.FAILURE);
export const levelsLoadCancel = createAction(TYPES.LEVELS.CANCEL);
