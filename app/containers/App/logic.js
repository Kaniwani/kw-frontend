import { createLogic } from 'redux-logic';
import * as api from 'shared/api';

import {
  serializeUser,
  serializeLevels,
  serializeReviewEntries,
  serializeStubbedReviewEntries,
  serializeLevelReviews,
  serializeSynonym,
} from 'shared/serializers';

import app from './actions';

const userLoadLogic = createLogic({
  type: app.user.load.request,
  cancelType: app.user.load.cancel,
  warnTimeout: 10000,
  latest: true,
  processOptions: {
    successType: app.user.load.success,
    failType: app.user.load.failure,
  },

  process() {
    return api.getUserProfile()
      .then((response) => serializeUser(response));
  },
});

const reloadSessionCountsLogic = createLogic({
  type: [
    app.level.lock.success,
    app.level.unlock.success,
  ],
  latest: true,
  processOptions: {
    successType: app.user.load.success,
    failType: app.user.load.failure,
  },

  process() {
    console.info('Reloading session count');
    return api.getUserProfile()
      .then((response) => serializeUser(response));
  },
});

const levelsLoadLogic = createLogic({
  type: app.levels.load.request,
  cancelType: app.levels.load.cancel,
  throttle: 60000,
  latest: true,
  warnTimeout: 10000,
  processOptions: {
    successType: app.levels.load.success,
    failType: app.levels.load.failure,
  },

  process() {
    return api.getLevels()
      .then((response) => serializeLevels(response));
  },
});

const levelLockLogic = createLogic({
  type: app.level.lock.request,
  cancelType: app.level.lock.cancel,
  warnTimeout: 10000,
  processOptions: {
    successType: app.level.lock.success,
    failType: app.level.lock.failure,
  },

  process({ action: { payload: { id } } }) {
    return api.lockLevel({ id })
      .then(() => ({ id }));
  },
});

const levelUnlockLogic = createLogic({
  type: app.level.unlock.request,
  cancelType: app.level.unlock.cancel,
  warnTimeout: 10000,
  validate({ getState, action }, allow, reject) {
    if (getState().global.ui.level.submitting.length >= 2) {
      reject(/* app.notifications('too many submissions, please wait')*/);
    }
    allow(action);
  },

  processOptions: {
    successType: app.level.unlock.success,
    failType: app.level.unlock.failure,
  },

  process({ action: { payload: { id } } }) {
    return api.unlockLevel({ id })
      .then(() => ({ id }));
  },
});

export const queueLoadLogic = createLogic({
  type: app.queue.load.request,
  cancelType: app.queue.load.cancel,
  warnTimeout: 8000,
  processOptions: {
    successType: app.queue.load.success,
    failType: app.queue.load.failure,
  },

  process({ action }) {
    console.log(action);
    // if (category === 'lessons') {
    //   return api.getCurrentLessons()
    //     .then((response) => serializeStubbedReviewEntries(response));
    // }
    return api.getCurrentReviews()
      .then((response) => serializeStubbedReviewEntries(response));
  },
});

const reviewsLoadLogic = createLogic({
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

const reviewLoadLogic = createLogic({
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

const reviewLockLogic = createLogic({
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

const reviewUnlockLogic = createLogic({
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

const addSynonymLogic = createLogic({
  type: app.synonym.add.request,
  cancelType: app.synonym.add.cancel,
  warnTimeout: 10000,
  latest: true,
  processOptions: {
    successType: app.synonym.add.success,
    failType: app.synonym.add.failure,
  },

  process({ action: { payload: { reviewId, character, kana } } }) {
    return api.addSynonym({ reviewId, character, kana })
      .then((response) => serializeSynonym(response));
  },
});

const removeSynonymLogic = createLogic({
  type: app.synonym.remove.request,
  cancelType: app.synonym.remove.cancel,
  warnTimeout: 10000,
  latest: true,
  processOptions: {
    successType: app.synonym.remove.success,
    failType: app.synonym.remove.failure,
  },

  process({ action: { payload: { id, reviewId } } }) {
    return api.removeSynonym({ id })
      .then(() => ({ id, reviewId }));
  },
});

const levelLoadLogic = createLogic({
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
  queueLoadLogic,
  levelsLoadLogic,
  levelLockLogic,
  levelUnlockLogic,
  reloadSessionCountsLogic,
  reviewsLoadLogic,
  reviewLoadLogic,
  addSynonymLogic,
  removeSynonymLogic,
  reviewLockLogic,
  reviewUnlockLogic,
  levelLoadLogic,
];
