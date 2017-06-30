import actionTypeCreator, { ASYNC } from 'redux-action-types-creator';
import { createAction } from 'redux-actions';

export const TYPES = actionTypeCreator('APP', { asyncSuffix: ['LOAD', 'SUCCESS', 'FAILURE', 'CANCEL'] })({
  USER: ASYNC, // load, success, failure, cancel
  REVIEWS: ASYNC, // load, success, failure, cancel
  QUEUE: ASYNC, // load, success, failure, cancel
  REVIEW: ASYNC, // load, success, failure, cancel
  LEVEL: ASYNC, // load, success, failure, cancel
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
export const queueLoad = createAction(TYPES.QUEUE.LOAD);
export const queueLoadSuccess = createAction(TYPES.QUEUE.SUCCESS);
export const queueLoadFailure = createAction(TYPES.QUEUE.FAILURE);
export const queueLoadCancel = createAction(TYPES.QUEUE.CANCEL);
export const reviewLoad = createAction(TYPES.REVIEW.LOAD);
export const reviewLoadSuccess = createAction(TYPES.REVIEW.SUCCESS);
export const reviewLoadFailure = createAction(TYPES.REVIEW.FAILURE);
export const reviewLoadCancel = createAction(TYPES.REVIEW.CANCEL);
export const levelLoad = createAction(TYPES.LEVEL.LOAD);
export const levelLoadSuccess = createAction(TYPES.LEVEL.SUCCESS);
export const levelLoadFailure = createAction(TYPES.LEVEL.FAILURE);
export const levelLoadCancel = createAction(TYPES.LEVEL.CANCEL);
export const levelsLoad = createAction(TYPES.LEVELS.LOAD);
export const levelsLoadSuccess = createAction(TYPES.LEVELS.SUCCESS);
export const levelsLoadFailure = createAction(TYPES.LEVELS.FAILURE);
export const levelsLoadCancel = createAction(TYPES.LEVELS.CANCEL);
