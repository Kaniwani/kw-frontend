import { createLogic } from 'redux-logic';
import { getCurrentReviews } from 'shared/api';
import {
    serializeStubbedReviewEntries,
} from 'shared/serializers';

import session from './actions';

// TODO: lessons api
const getCurrentLessons = () => Promise.resolve('No lessons api yet!');

export const queueLoadLogic = createLogic({
  type: session.queue.load.request,
  cancelType: session.queue.load.cancel,
  warnTimeout: 8000,
  processOptions: {
    successType: session.queue.load.success,
    failType: session.queue.load.failure,
  },

  process({ action: { meta: { category } } }) {
    if (category === 'lessons') {
      return getCurrentLessons()
        .then((response) => serializeStubbedReviewEntries(response));
    }
    return getCurrentReviews()
      .then((response) => serializeStubbedReviewEntries(response));
  },
});

// All logic to be loaded
export default [
  queueLoadLogic,
];
