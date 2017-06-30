import { createLogic } from 'redux-logic';
import * as api from 'shared/api';
import {
  serializeUserProfile,
  serializeStubbedReviewEntries,
  serializeLevel,
} from 'shared/serializers';
import * as actions from './actions';

export const userLoadLogic = createLogic({
  type: actions.userLoad,
  cancelType: actions.userLoadCancel,
  latest: true,
  throttle: 10000, // 10 secs
  processOptions: {
    successType: actions.userLoadSuccess,
    failType: actions.userLoadFailure,
  },
  warnTimeout: 20000, // 20 secs

  process() {
    return api.getUserProfile().then((response) => serializeUserProfile(response));
  },
});

export const reviewsLoadLogic = createLogic({
  type: actions.reviewsLoad,
  cancelType: actions.reviewsLoadCancel,
  latest: true,
  throttle: 10000, // 10 secs
  processOptions: {
    successType: actions.reviewsLoadSuccess,
    failType: actions.reviewsLoadFailure,
  },
  warnTimeout: 20000, // 20 secs

  process() {
    return api.getCurrentReviews().then((response) => serializeStubbedReviewEntries(response));
  },
});

export const levelsLoadLogic = createLogic({
  type: actions.levelsLoad,
  cancelType: actions.levelsLoadCancel,
  latest: true,
  throttle: 10000, // 10 secs
  processOptions: {
    successType: actions.levelsLoadSuccess,
    failType: actions.levelsLoadFailure,
  },
  warnTimeout: 20000, // 20 secs

  process() {
    return api.getLevel({ level: 47 }).then((response) => serializeLevel({ level, ...response }));
  },
});

// All logic to be loaded
export default [
  userLoadLogic,
  reviewsLoadLogic,
  levelsLoadLogic,
];
