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

const TEN_SECONDS = 10000;

export const userLoadLogic = createLogic({
  type: actions.userLoad,
  cancelType: actions.userLoadCancel,
  warnTimeout: TEN_SECONDS,
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
  type: actions.queueLoad,
  cancelType: actions.queueLoadCancel,
  warnTimeout: TEN_SECONDS,
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
  type: actions.reviewsLoad,
  cancelType: actions.reviewsLoadCancel,
  warnTimeout: TEN_SECONDS,
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
  type: actions.reviewLoad,
  cancelType: actions.reviewLoadCancel,
  warnTimeout: TEN_SECONDS,
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
  type: actions.levelLoad,
  cancelType: actions.levelLoadCancel,
  warnTimeout: TEN_SECONDS,
  processOptions: {
    successType: actions.levelLoadSuccess,
    failType: actions.levelLoadFailure,
  },

  process({ action: { payload } }) {
    return api.getLevel(payload.level)
      .then((response) => serializeLevel({ level: payload.level, ...response }));
  },
});

export const levelsLoadLogic = createLogic({
  type: actions.levelsLoad,
  cancelType: actions.levelsLoadCancel,
  latest: true,
  warnTimeout: TEN_SECONDS,
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
