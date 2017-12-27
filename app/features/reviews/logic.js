import { createLogic } from "redux-logic";

import review from "./actions";

export const reviewLoadLogic = createLogic({
  type: review.load.request,
  warnTimeout: 10000,
  process({ api, serializers, action }, dispatch, done) {
    const { payload: { id } } = action;
    api.review
      .fetch({ id })
      .then((response) => {
        const item = serializers.serializeReviewResponse(response);
        dispatch(review.load.success(item));
        done();
      })
      .catch(({ status, response, message, ...rest }) => {
        dispatch(review.load.failure({ status, response, message, ...rest }));
        done();
      });
  },
});

export const reviewLockLogic = createLogic({
  type: review.lock.request,
  warnTimeout: 5000,
  processOptions: {
    successType: review.lock.success,
    failType: review.lock.failure,
  },

  process({ api, action }) {
    const { payload: { id } } = action;
    return api.review.hide({ id }).then(() => ({ id, hidden: true }));
  },
});

export const reviewUnlockLogic = createLogic({
  type: review.unlock.request,
  warnTimeout: 5000,
  processOptions: {
    successType: review.unlock.success,
    failType: review.unlock.failure,
  },

  process({ api, action }) {
    const { payload: { id } } = action;
    return api.review.unhide({ id }).then(() => ({ id, hidden: false }));
  },
});

export const updateNotesLogic = createLogic({
  type: review.updateNotes.request,
  warnTimeout: 10000,
  processOptions: {
    successType: review.updateNotes.success,
    failType: review.updateNotes.failure,
  },
  process({ api, action }) {
    return api.review.update(action.payload);
  },
});

export default [reviewLoadLogic, reviewLockLogic, reviewUnlockLogic, updateNotesLogic];
