import { createLogic } from 'redux-logic';
import * as api from 'shared/api';

import {
  serializeUser,
  serializeLevels,
  serializeReviewEntries,
  serializeLevelReviews,
  serializeSynonym,
} from 'shared/serializers';

import actions from './actions';

const userLoadLogic = createLogic({
  type: actions.user.load.request,
  cancelType: actions.user.load.cancel,
  warnTimeout: 10000,
  latest: true,
  processOptions: {
    successType: actions.user.load.success,
    failType: actions.user.load.failure,
  },

  process() {
    return api.getUserProfile()
      .then((response) => serializeUser(response));
  },
});

const reloadSessionCountsLogic = createLogic({
  type: [
    actions.level.lock.success,
    actions.level.unlock.success,
  ],
  latest: true,
  processOptions: {
    successType: actions.user.load.success,
    failType: actions.user.load.failure,
  },

  process() {
    console.info('Reloading session count');
    return api.getUserProfile()
      .then((response) => serializeUser(response));
  },
});

const levelsLoadLogic = createLogic({
  type: actions.levels.load.request,
  cancelType: actions.levels.load.cancel,
  throttle: 60000,
  latest: true,
  warnTimeout: 10000,
  processOptions: {
    successType: actions.levels.load.success,
    failType: actions.levels.load.failure,
  },

  process() {
    return api.getLevels()
      .then((response) => serializeLevels(response));
  },
});

const levelLockLogic = createLogic({
  type: actions.level.lock.request,
  cancelType: actions.level.lock.cancel,
  warnTimeout: 10000,
  processOptions: {
    successType: actions.level.lock.success,
    failType: actions.level.lock.failure,
  },

  process({ action: { payload: { id } } }) {
    return api.lockLevel({ id })
      .then(() => ({ id }));
  },
});

const levelUnlockLogic = createLogic({
  type: actions.level.unlock.request,
  cancelType: actions.level.unlock.cancel,
  warnTimeout: 10000,
  validate({ getState, action }, allow, reject) {
    if (getState().global.ui.level.submitting.length >= 2) {
      reject(/* actions.notifications('too many submissions, please wait')*/);
    }
    allow(action);
  },

  processOptions: {
    successType: actions.level.unlock.success,
    failType: actions.level.unlock.failure,
  },

  process({ action: { payload: { id } } }) {
    return api.unlockLevel({ id })
      .then(() => ({ id }));
  },
});


const reviewsLoadLogic = createLogic({
  type: actions.reviews.load.request,
  cancelType: actions.reviews.load.cancel,
  warnTimeout: 10000,
  latest: true,
  processOptions: {
    successType: actions.reviews.load.success,
    failType: actions.reviews.load.failure,
  },

  process({ action: { payload: { id } } }) {
    return api.getReviews({ id })
      .then((response) => serializeReviewEntries(response));
  },
});

const reviewLoadLogic = createLogic({
  type: actions.review.load.request,
  cancelType: actions.review.load.cancel,
  warnTimeout: 10000,
  latest: true,
  processOptions: {
    successType: actions.review.load.success,
    failType: actions.review.load.failure,
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
  type: actions.review.lock.request,
  cancelType: actions.review.lock.cancel,
  warnTimeout: 10000,
  latest: true,
  processOptions: {
    successType: actions.review.lock.success,
    failType: actions.review.lock.failure,
  },

  process({ action: { payload: { id } } }) {
    return api.lockReview({ id })
      .then(() => ({ id, isHidden: true }));
  },
});

const reviewUnlockLogic = createLogic({
  type: actions.review.unlock.request,
  cancelType: actions.review.unlock.cancel,
  warnTimeout: 10000,
  latest: true,
  processOptions: {
    successType: actions.review.unlock.success,
    failType: actions.review.unlock.failure,
  },

  process({ action: { payload: { id } } }) {
    return api.unlockReview({ id })
      .then(() => ({ id, isHidden: false }));
  },
});

const addSynonymLogic = createLogic({
  type: actions.synonym.add.request,
  cancelType: actions.synonym.add.cancel,
  warnTimeout: 10000,
  latest: true,
  processOptions: {
    successType: actions.synonym.add.success,
    failType: actions.synonym.add.failure,
  },

  process({ action: { payload: { reviewId, character, kana } } }) {
    return api.addSynonym({ reviewId, character, kana })
      .then((response) => serializeSynonym(response));
  },
});

const removeSynonymLogic = createLogic({
  type: actions.synonym.remove.request,
  cancelType: actions.synonym.remove.cancel,
  warnTimeout: 10000,
  latest: true,
  processOptions: {
    successType: actions.synonym.remove.success,
    failType: actions.synonym.remove.failure,
  },

  process({ action: { payload: { id, reviewId } } }) {
    return api.removeSynonym({ id })
      .then(() => ({ id, reviewId }));
  },
});

const levelLoadLogic = createLogic({
  type: actions.level.load.request,
  cancelType: actions.level.load.cancel,
  warnTimeout: 10000,
  latest: true,
  processOptions: {
    successType: actions.level.load.success,
    failType: actions.level.load.failure,
  },

  process({ action: { payload: { id } } }) {
    return api.getReviews({ id })
      .then((response) => serializeLevelReviews({ id, response }));
  },
});

// All logic to be loaded
export default [
  userLoadLogic,
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
