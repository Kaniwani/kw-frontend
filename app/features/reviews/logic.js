import { createLogic } from 'redux-logic';

import { app } from 'common/actions';
import notify from 'features/notifications/actions';
import review from './actions';

export const reviewLoadLogic = createLogic({
  type: review.load.request,
  warnTimeout: 10000,
  process(
    {
      api,
      serializers,
      action: { payload },
    },
    dispatch,
    done
  ) {
    const { id } = payload;
    api.review
      .fetch({ id })
      .then((response) => {
        const item = serializers.serializeReviewResponse(response);
        dispatch(review.load.success(item));
        done();
      })
      .catch((err) => {
        dispatch(
          notify.warning({
            content:
              'There was a problem contacting the server, you may be experiencing connection problems.',
            duration: 3000,
          })
        );
        dispatch(app.captureError(err, payload));
        dispatch(review.load.failure(err));
        done();
      });
  },
});

export const reviewLockLogic = createLogic({
  type: review.lock.request,
  warnTimeout: 5000,
  process(
    {
      api,
      action: { payload },
    },
    dispatch,
    done
  ) {
    const { id } = payload;
    return api.review
      .hide({ id })
      .then(() => {
        dispatch(review.lock.success({ id, hidden: true }));
        dispatch(
          notify.success({
            content: `This word will no longer appear in your reviews.`,
            duration: 2000,
          })
        );
        done();
      })
      .catch((err) => {
        dispatch(app.captureError(err, payload));
        dispatch(review.lock.failure(err));
        done();
      });
  },
});

export const reviewUnlockLogic = createLogic({
  type: review.unlock.request,
  warnTimeout: 5000,
  process(
    {
      api,
      action: { payload },
    },
    dispatch,
    done
  ) {
    const { id } = payload;
    return api.review
      .unhide({ id })
      .then(() => {
        dispatch(review.unlock.success({ id, hidden: false }));
        dispatch(
          notify.success({
            content: `This word will appear in your reviews again.`,
            duration: 2000,
          })
        );
        done();
      })
      .catch((err) => {
        dispatch(review.unlock.failure(err));
        dispatch(app.captureError(err, payload));
        done();
      });
  },
});

export const reviewResetLogic = createLogic({
  type: review.reset.request,
  warnTimeout: 5000,
  process(
    {
      api,
      action: { payload },
    },
    dispatch,
    done
  ) {
    const { id } = payload;
    return api.review
      .reset({ id })
      .then(() => {
        dispatch(review.reset.success({ id }));
        dispatch(
          notify.success({
            content: `This word has been reset to Apprentice.`,
            duration: 2000,
          })
        );
        done();
      })
      .catch((err) => {
        dispatch(review.reset.failure(err));
        dispatch(app.captureError(err, payload));
        done();
      });
  },
});

export const updateNotesLogic = createLogic({
  type: review.updateNotes.request,
  warnTimeout: 10000,
  process(
    {
      api,
      action: { payload },
    },
    dispatch,
    done
  ) {
    return api.review
      .update(payload)
      .then((res) => {
        dispatch(review.updateNotes.success(res));
        dispatch(
          notify.success({
            content: `Notes updated!`,
            duration: 2000,
          })
        );
        done();
      })
      .catch((err) => {
        dispatch(review.updateNotes.failure(err));
        dispatch(app.captureError(err, payload));
        dispatch(
          notify.warning({
            content:
              'There was a problem saving notes to the server, you may be experiencing connection problems.',
            duration: 3000,
          })
        );
        done();
      });
  },
});

export default [
  reviewLoadLogic,
  reviewLockLogic,
  reviewUnlockLogic,
  reviewResetLogic,
  updateNotesLogic,
];
