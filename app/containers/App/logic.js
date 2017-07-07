import { createLogic } from 'redux-logic';
import * as api from 'shared/api';

import {
  serializeUserProfile,
  serializeReviewEntries,
  serializeLevelReviews,
  serializeSynonym,
} from 'shared/serializers';

import levels from 'containers/VocabLevelsPage/actions';
import app from './actions';

export const userLoadLogic = createLogic({
  type: [app.user.load.request, levels.locklevel.success, levels.unlocklevel.success],
  cancelType: app.user.load.cancel,
  warnTimeout: 10000,
  latest: true,
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
  latest: true,
  processOptions: {
    successType: app.reviews.load.success,
    failType: app.reviews.load.failure,
  },

  process({ action: { payload: { id } } }) {
    return api.getReviews({ id })
      .then((response) => serializeReviewEntries(response));
  },
});

export const reviewLoadLogic = createLogic({
  type: app.review.load.request,
  cancelType: app.review.load.cancel,
  warnTimeout: 10000,
  latest: true,
  processOptions: {
    successType: app.review.load.success,
    failType: app.review.load.failure,
  },

  process({ action: { payload: { id } } }) {
    // intentionally using serializeReviewEntries && { results: [response] }
    // to force proper normalization format for reducer
    // TODO: rename serializeReviewEntry and handle with just ( response )
    return api.getReviewEntry({ id })
      .then((response) => serializeReviewEntries({ results: [response] }));
  },
});

export const reviewLockLogic = createLogic({
  type: app.review.lock.request,
  cancelType: app.review.lock.cancel,
  warnTimeout: 10000,
  latest: true,
  processOptions: {
    successType: app.review.lock.success,
    failType: app.review.lock.failure,
  },

  process({ action: { payload: { id } } }) {
    return api.lockReview({ id })
      .then(() => ({ id, isHidden: true }));
  },
});

export const reviewUnlockLogic = createLogic({
  type: app.review.unlock.request,
  cancelType: app.review.unlock.cancel,
  warnTimeout: 10000,
  latest: true,
  processOptions: {
    successType: app.review.unlock.success,
    failType: app.review.unlock.failure,
  },

  process({ action: { payload: { id } } }) {
    return api.unlockReview({ id })
      .then(() => ({ id, isHidden: false }));
  },
});

export const addSynonymLogic = createLogic({
  type: app.review.synonym.add.request,
  cancelType: app.review.synonym.add.cancel,
  warnTimeout: 10000,
  latest: true,
  processOptions: {
    successType: app.review.synonym.add.success,
    failType: app.review.synonym.add.failure,
  },

  process({ action: { payload: { reviewId, character, kana } } }) {
    return api.addSynonym({ reviewId, character, kana })
      .then((response) => serializeSynonym(response));
  },
});

export const removeSynonymLogic = createLogic({
  type: app.review.synonym.remove.request,
  cancelType: app.review.synonym.remove.cancel,
  warnTimeout: 10000,
  latest: true,
  processOptions: {
    successType: app.review.synonym.remove.success,
    failType: app.review.synonym.remove.failure,
  },

  process({ action: { payload: { id, reviewId } } }) {
    return api.removeSynonym({ id })
      .then(() => ({ id, reviewId }));
  },
});

// TODO: move to vocabLevelPage
export const levelLoadLogic = createLogic({
  type: app.level.load.request,
  cancelType: app.level.load.cancel,
  warnTimeout: 10000,
  latest: true,
  processOptions: {
    successType: app.level.load.success,
    failType: app.level.load.failure,
  },

  process({ action: { payload: { id } } }) {
    return api.getReviews({ id })
      .then((response) => serializeLevelReviews({ id, response }));
  },
});

// All logic to be loaded
export default [
  userLoadLogic,
  reviewsLoadLogic,
  reviewLoadLogic,
  addSynonymLogic,
  removeSynonymLogic,
  reviewLockLogic,
  reviewUnlockLogic,
  levelLoadLogic,
];
