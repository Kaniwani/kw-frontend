import { createLogic } from 'redux-logic';

import settings from './actions';
import { user } from 'features/user/actions';
import { vocab } from 'features/vocab/actions';
import { selectUserProfile } from 'features/user/selectors';
import { deserializeUserProfile } from 'common/serializers';

export const saveSettingsLogic = createLogic({
  type: settings.save.request,
  process({ getState, api, action }, dispatch, done) {
    const { id } = selectUserProfile(getState());
    const updatedProfile = deserializeUserProfile(action.payload);
    const { form } = action.meta;

    form.startSubmit();
    api.user
      .update({ id, ...updatedProfile })
      .then((response) => {
        dispatch(user.load.success({ profile: response }));
        dispatch(settings.save.success());
        form.setSubmitSucceeded();
        done();
      })
      .catch((err) => {
        dispatch(settings.save.failure(err));
        form.setSubmitFailed();
        done();
      });
  },
});

export const resetProgressLogic = createLogic({
  type: settings.resetProgress.request,
  processOptions: {
    failType: settings.resetProgress.failure,
  },
  process({ api, action: { payload } }, dispatch, done) {
    api.user.resetProgress(payload).then(() => {
      dispatch(user.load.request());
      dispatch(vocab.levels.load.request());
      done();
    });
  },
});

export default [resetProgressLogic, saveSettingsLogic];
