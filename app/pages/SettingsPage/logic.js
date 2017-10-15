import { createLogic } from 'redux-logic';

import { deserializeSettings } from 'shared/serializers';
import * as api from 'shared/api';
import app from 'shared/actions';
import { selectProfile, selectSettings } from 'shared/selectors';

export const saveSettingsLogic = createLogic({
  type: app.settings.save.request,
  processOptions: {
    failType: app.settings.save.failure,
  },
  process({ getState, action: { payload } }, dispatch, done) {
    const { id } = selectProfile(getState());
    const { quiz: { minimumSrsToReview } } = selectSettings(getState());
    const serverSettings = deserializeSettings(payload);
    api.saveSettings({ id, settings: serverSettings })
      .then(() => {
        if (payload.quiz.minimumSrsToReview !== minimumSrsToReview) {
          dispatch(app.reviews.queue.clear());
          dispatch(app.lessons.queue.clear());
          dispatch(app.user.load.request());
        }
        dispatch(app.settings.save.success(payload));
        done();
      });
  },
});

export const resetProgressLogic = createLogic({
  type: app.settings.resetProgress.request,
  processOptions: {
    failType: app.settings.resetProgress.failure,
  },
  process({ action: { payload } }, dispatch, done) {
    api.resetProgress(payload).then(() => {
      dispatch(app.reviews.queue.clear());
      dispatch(app.user.load.request());
      done();
    });
  },
});

export default [
  resetProgressLogic,
  saveSettingsLogic,
];
