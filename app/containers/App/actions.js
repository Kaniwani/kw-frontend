import actionTypeCreator, { ASYNC } from 'redux-action-types-creator';
import { createAction } from 'redux-actions';

export const TYPES = actionTypeCreator('APP', { asyncSuffix: ['REQUEST', 'SUCCESS', 'FAILURE', 'CANCEL'] })({
  USER: {
    LOAD: ASYNC,
  },
  REVIEWS: {
    LOAD: ASYNC,
  },
  QUEUE: {
    LOAD: ASYNC,
  },
  REVIEW: {
    LOAD: ASYNC,
  },
  LEVEL: {
    LOAD: ASYNC,
    LOCK: ASYNC,
    UNLOCK: ASYNC,
  },
  LOCKLEVEL: {
    LOAD: ASYNC,
  },
  UNLOCKLEVEL: {
    LOAD: ASYNC,
  },
  LEVELS: {
    LOAD: ASYNC,
  },
});

export const userLoadRequest = createAction(TYPES.USER.LOAD.REQUEST);
export const userLoadSuccess = createAction(TYPES.USER.LOAD.SUCCESS);
export const userLoadFailure = createAction(TYPES.USER.LOAD.FAILURE);
export const userLoadCancel = createAction(TYPES.USER.LOAD.CANCEL);
export const reviewsLoadRequest = createAction(TYPES.REVIEWS.LOAD.REQUEST);
export const reviewsLoadSuccess = createAction(TYPES.REVIEWS.LOAD.SUCCESS);
export const reviewsLoadFailure = createAction(TYPES.REVIEWS.LOAD.FAILURE);
export const reviewsLoadCancel = createAction(TYPES.REVIEWS.LOAD.CANCEL);
export const queueLoadRequest = createAction(TYPES.QUEUE.LOAD.REQUEST);
export const queueLoadSuccess = createAction(TYPES.QUEUE.LOAD.SUCCESS);
export const queueLoadFailure = createAction(TYPES.QUEUE.LOAD.FAILURE);
export const queueLoadCancel = createAction(TYPES.QUEUE.LOAD.CANCEL);
export const reviewLoadRequest = createAction(TYPES.REVIEW.LOAD.REQUEST);
export const reviewLoadSuccess = createAction(TYPES.REVIEW.LOAD.SUCCESS);
export const reviewLoadFailure = createAction(TYPES.REVIEW.LOAD.FAILURE);
export const reviewLoadCancel = createAction(TYPES.REVIEW.LOAD.CANCEL);
export const levelLoadRequest = createAction(TYPES.LEVEL.LOAD.REQUEST);
export const levelLoadSuccess = createAction(TYPES.LEVEL.LOAD.SUCCESS);
export const levelLoadFailure = createAction(TYPES.LEVEL.LOAD.FAILURE);
export const levelLoadCancel = createAction(TYPES.LEVEL.LOAD.CANCEL);
export const levelLockRequest = createAction(TYPES.LEVEL.LOCK.REQUEST);
export const levelLockSuccess = createAction(TYPES.LEVEL.LOCK.SUCCESS);
export const levelLockFailure = createAction(TYPES.LEVEL.LOCK.FAILURE);
export const levelLockCancel = createAction(TYPES.LEVEL.LOCK.CANCEL);
export const levelUnlockRequest = createAction(TYPES.LEVEL.UNLOCK.REQUEST);
export const levelUnlockSuccess = createAction(TYPES.LEVEL.UNLOCK.SUCCESS);
export const levelUnlockFailure = createAction(TYPES.LEVEL.UNLOCK.FAILURE);
export const levelUnlockCancel = createAction(TYPES.LEVEL.UNLOCK.CANCEL);
export const levelsLoadRequest = createAction(TYPES.LEVELS.LOAD.REQUEST);
export const levelsLoadSuccess = createAction(TYPES.LEVELS.LOAD.SUCCESS);
export const levelsLoadFailure = createAction(TYPES.LEVELS.LOAD.FAILURE);
export const levelsLoadCancel = createAction(TYPES.LEVELS.LOAD.CANCEL);
