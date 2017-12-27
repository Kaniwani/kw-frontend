import { createLogic } from 'redux-logic';

import settings from './actions';
import { user } from 'features/user/actions';
import { vocab } from 'features/vocab/actions';
import { selectUserProfile } from 'features/user/selectors';
import { deserializeUserProfile } from 'common/serializers';

export const saveSettingsLogic = createLogic({
  type: settings.save.request,
  processOptions: {
    failType: settings.save.failure,
  },
  process({ getState, api, action: { payload } }, dispatch, done) {
    const { id } = selectUserProfile(getState());
    const updatedProfile = deserializeUserProfile(payload);

    api.user.update({ id, ...updatedProfile }).then((response) => {
      dispatch(user.load.success({ profile: response } ));
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
