import { createLogic } from 'redux-logic';

import { deserializeSettings } from 'shared/serializers';
import * as api from 'shared/api';
import app from 'containers/App/actions';
import { selectProfile } from 'containers/App/selectors';

export const saveSettingsLogic = createLogic({
  type: app.settings.save.request,
  processOptions: {
    successType: app.settings.save.success,
    failType: app.settings.save.failure,
  },
  process({ getState, action: { payload } }) {
    const { id } = selectProfile(getState());
    const serverSettings = deserializeSettings(payload);
    return api.saveSettings({ id, settings: serverSettings }).then(() => payload);
  },
});

export const resetProgressLogic = createLogic({
  type: app.settings.resetProgress.request,
  processOptions: {
    successType: app.user.load.request,
    failType: app.settings.resetProgress.failure,
  },
  process() {
    return api.resetProgress();
  },
});

export default [
  resetProgressLogic,
  saveSettingsLogic,
];
