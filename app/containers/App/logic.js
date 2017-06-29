import { createLogic } from 'redux-logic';
import { getUserProfile, getCurrentReviews } from 'shared/api';
import { serializeUserProfile, serializeStubbedReviewEntries } from 'shared/serializers';

import {
  userLoad,
  userLoadCancel,
  userLoadSuccess,
  userLoadFailure,
  reviewsLoad,
  reviewsLoadCancel,
  reviewsLoadSuccess,
  reviewsLoadFailure,
} from './actions';

export const userLoadLogic = createLogic({
  type: userLoad,
  cancelType: userLoadCancel,
  latest: true,
  throttle: 10000, /* 10 secs */
  processOptions: {
    successType: userLoadSuccess,
    failType: userLoadFailure,
  },
  warnTimeout: 20000, /* 20 secs */

  process() {
    return getUserProfile().then((res) => serializeUserProfile(res));
  },
});

export const reviewsLoadLogic = createLogic({
  type: reviewsLoad,
  cancelType: reviewsLoadCancel,
  latest: true,
  throttle: 10000, /* 10 secs */
  processOptions: {
    successType: reviewsLoadSuccess,
    failType: reviewsLoadFailure,
  },
  warnTimeout: 20000, /* 20 secs */

  process() {
    return getCurrentReviews().then((res) => serializeStubbedReviewEntries(res.results));
  },
});

// All logic to be loaded
export default [
  userLoadLogic,
  reviewsLoadLogic,
];
