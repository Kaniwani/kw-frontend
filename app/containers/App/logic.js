import { createLogic } from 'redux-logic';
import * as api from 'shared/api';
import {
  serializeUserProfile,
  serializeStubbedReviewEntries,
  serializeReviewEntries,
  serializeLevel,
  serializeLevels,
} from 'shared/serializers';

import * as actions from './actions';

const TWENTY_SECONDS = 20000;

export const userLoadLogic = createLogic({
  type: actions.userLoadRequest,
  cancelType: actions.userLoadCancel,
  warnTimeout: TWENTY_SECONDS,
  processOptions: {
    successType: actions.userLoadSuccess,
    failType: actions.userLoadFailure,
  },

  process() {
    return api.getUserProfile()
      .then((response) => serializeUserProfile(response));
  },
});

export const queueLoadLogic = createLogic({
  type: actions.queueLoadRequest,
  cancelType: actions.queueLoadCancel,
  warnTimeout: TWENTY_SECONDS,
  processOptions: {
    successType: actions.queueLoadSuccess,
    failType: actions.queueLoadFailure,
  },

  process() {
    return api.getCurrentReviews()
      .then((response) => serializeStubbedReviewEntries(response));
  },
});

export const reviewsLoadLogic = createLogic({
  type: actions.reviewsLoadRequest,
  cancelType: actions.reviewsLoadCancel,
  warnTimeout: TWENTY_SECONDS,
  processOptions: {
    successType: actions.reviewsLoadSuccess,
    failType: actions.reviewsLoadFailure,
  },

  process({ action: { payload } }) {
    return api.getReviews(payload)
      .then((response) => serializeReviewEntries(response));
  },
});

export const reviewLoadLogic = createLogic({
  type: actions.reviewLoadRequest,
  cancelType: actions.reviewLoadCancel,
  warnTimeout: TWENTY_SECONDS,
  processOptions: {
    successType: actions.reviewLoadSuccess,
    failType: actions.reviewLoadFailure,
  },

  process({ action: { payload } }) {
    // intentionally using serializeReviewEntries to force normalization for single item
    return api.getReviewEntry(payload.id)
      .then((response) => serializeReviewEntries({ results: [response] }));
  },
});

export const levelLoadLogic = createLogic({
  type: actions.levelLoadRequest,
  cancelType: actions.levelLoadCancel,
  warnTimeout: TWENTY_SECONDS,
  processOptions: {
    successType: actions.levelLoadSuccess,
    failType: actions.levelLoadFailure,
  },

  process({ action: { payload } }) {
    return api.getLevel(payload.level)
      .then((response) => serializeLevel({ level: payload.level, ...response }));
  },
});

export const levelLockLogic = createLogic({
  type: actions.levelLockRequest,
  cancelType: actions.levelLockCancel,
  warnTimeout: TWENTY_SECONDS,
  processOptions: {
    successType: actions.levelLockSuccess,
    failType: actions.levelLockFailure,
  },

  process({ action: { payload } }) {
    return api.lockLevel(payload.level)
      .then((response) => { console.log(response); return response; });
  },
});

export const levelUnlockLogic = createLogic({
  type: actions.levelUnlockRequest,
  cancelType: actions.levelUnlockCancel,
  warnTimeout: TWENTY_SECONDS,
  processOptions: {
    successType: actions.levelUnlockSuccess,
    failType: actions.levelUnlockFailure,
  },

  process({ action: { payload } }) {
    return api.unlockLevel(payload.level)
    .then((response) => { console.log(response); return response; });
  },
});

export const levelsLoadLogic = createLogic({
  type: actions.levelsLoadRequest,
  cancelType: actions.levelsLoadCancel,
  latest: true,
  warnTimeout: TWENTY_SECONDS,
  processOptions: {
    successType: actions.levelsLoadSuccess,
    failType: actions.levelsLoadFailure,
  },

  process() {
    return api.getLevels()
      .then((response) => serializeLevels(response));
  },
});

// All logic to be loaded
export default [
  userLoadLogic,
  reviewsLoadLogic,
  queueLoadLogic,
  reviewLoadLogic,
  levelLoadLogic,
  levelsLoadLogic,
];
