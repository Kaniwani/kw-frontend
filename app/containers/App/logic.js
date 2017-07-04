import { createLogic } from 'redux-logic';
import * as api from 'shared/api';

import {
  serializeUserProfile,
  serializeReviewEntries,
  serializeLevel,
} from 'shared/serializers';

import app from './actions';

export const userLoadLogic = createLogic({
  type: app.user.load.request,
  cancelType: app.user.load.cancel,
  warnTimeout: 10000,
  processOptions: {
    successType: app.user.load.success,
    failType: app.user.load.failure,
  },

  process() {
    return api.getUserProfile()
      .then((response) => serializeUserProfile(response));
  },
});

// TODO: move to review session
export const reviewsLoadLogic = createLogic({
  type: app.reviews.load.request,
  cancelType: app.reviews.load.cancel,
  warnTimeout: 10000,
  processOptions: {
    successType: app.reviews.load.success,
    failType: app.reviews.load.failure,
  },

  process({ action: { payload } }) {
    return api.getReviews(payload)
      .then((response) => serializeReviewEntries(response));
  },
});

// TODO: move to vocabEntryPage
export const reviewLoadLogic = createLogic({
  type: app.review.load.request,
  cancelType: app.review.load.cancel,
  warnTimeout: 10000,
  processOptions: {
    successType: app.review.load.success,
    failType: app.review.load.failure,
  },

  process({ action: { payload } }) {
    // intentionally using serializeReviewEntries && { results: [response] }
    // to force proper normalization format for reducer
    return api.getReviewEntry(payload.id)
      .then((response) => serializeReviewEntries({ results: [response] }));
  },
});

// TODO: move to vocabLevelPage
export const levelLoadLogic = createLogic({
  type: app.level.load.request,
  cancelType: app.level.load.cancel,
  warnTimeout: 10000,
  processOptions: {
    successType: app.level.load.success,
    failType: app.level.load.failure,
  },

  process({ action: { payload } }) {
    return api.getReviews(payload)
      .then((response) => serializeLevel({ level: payload.level, ...response }));
  },
});

// All logic to be loaded
export default [
  userLoadLogic,
  reviewsLoadLogic,
  reviewLoadLogic,
  levelLoadLogic,
];
