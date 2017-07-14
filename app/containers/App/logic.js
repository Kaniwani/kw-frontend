import { createLogic } from 'redux-logic';
import sample from 'lodash/sample';
import difference from 'lodash/difference';
// TODO: inject some of these as dependencies instead?
import * as api from 'shared/api';

import {
  serializeUserResponse,
  serializeLevelsResponse,
  serializeReviewResponse,
  serializeQueueResponse,
  serializeLevelResponse,
  serializeAddSynonymResponse,
} from 'shared/serializers';

// TODO: find/replace sel.selectorZ and import { selectorX, selectorY }
import * as sel from './selectors';
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
      .then((res) => serializeUserResponse(res));
  },
});

const loadQueuesIfNeededLogic = createLogic({
  type: app.user.load.success,
  latest: true,
  process({ getState, action }, dispatch, done) {
    const globalState = sel.selectGlobal(getState());
    const dashboard = sel.selectDashboard(getState());
    const needReviewsQueue = dashboard.reviewsCount > 0 && globalState.reviews.queue.length <= 0;
    const needLessonsQueue = dashboard.lessonsCount > 0 && globalState.lessons.queue.length <= 0;
    if (needReviewsQueue) { dispatch(app.reviews.queue.load.request()); }
    if (needLessonsQueue) { dispatch(app.lessons.queue.load.request()); }
    done();
  },
});

export const reviewsQueueLoadLogic = createLogic({
  type: app.reviews.queue.load.request,
  cancelType: app.reviews.queue.load.cancel,
  warnTimeout: 8000,
  // throttle: 10000,
  latest: true,

  processOptions: {
    successType: app.reviews.queue.load.success,
    failType: app.reviews.queue.load.failure,
  },

  process() {
    return api.getCurrentReviews()
      .then((res) => serializeQueueResponse(res));
  },
});

const setCurrentOnQueueLoadLogic = createLogic({
  type: app.reviews.queue.load.success,
  latest: true,
  process({ getState, action: { type } }, dispatch, done) {
    const reviews = sel.selectReviews(getState());
    const { current, queue } = reviews;
    if (!current && queue.length) {
      const newCurrent = reviews[sample(queue)];
      dispatch(app.reviews.current.set(newCurrent));
    } else {
      console.log('Already have current: ', { current, queue });
    }
    done();
  },
});

// fire after record or ignore answer || rotateReview
const returnCurrentReviewLogic = createLogic({
  type: app.reviews.current.return,
  latest: true,
  validate({ getState, action: { type } }, allow, reject) {
    const reviews = sel.selectReviews(getState());
    const { current, queue } = reviews;
    let newCurrent = current;
    if (queue.length > 1) {
      newCurrent = reviews[sample(difference(queue, [current]))];
      allow({ type, payload: newCurrent });
    } else {
      reject();
      console.log('rejected returning current', { current, newCurrent });
    }
  },
});

const reloadQueueCountsLogic = createLogic({
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
    console.info('Reloading queue counts');
    return api.getUserProfile()
      .then((res) => serializeUserResponse(res));
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
      .then((res) => serializeLevelsResponse(res));
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
    // TODO: could set up a queue instead.
    // https://github.com/jeffbski/redux-logic/tree/master/examples/notification
    const alreadySubmitting = sel.selectUi(getState()).levels.submitting.length >= 1;
    if (alreadySubmitting) {
      alert('Please unlock levels one at a time. Turtles get tired too.');
      reject(/* app.notifications.alert*/);
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
    return api.getReviewEntry({ id })
      .then((res) => serializeReviewResponse(res));
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
      .then((res) => serializeAddSynonymResponse(res));
  },
});

const removeSynonymLogic = createLogic({
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
      .then(({ results }) => serializeLevelResponse({ id, results }));
  },
});

// All logic to be loaded
export default [
  userLoadLogic,
  reviewsQueueLoadLogic,
  loadQueuesIfNeededLogic,
  setCurrentOnQueueLoadLogic,
  returnCurrentReviewLogic,
  levelsLoadLogic,
  levelLockLogic,
  levelUnlockLogic,
  reloadQueueCountsLogic,
  reviewLoadLogic,
  addSynonymLogic,
  removeSynonymLogic,
  reviewLockLogic,
  reviewUnlockLogic,
  levelLoadLogic,
];