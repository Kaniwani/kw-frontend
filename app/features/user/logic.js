import { createLogic } from 'redux-logic';
import { hasToken, clearToken } from 'common/utils/auth';

import { app } from 'common/actions';
import { user } from './actions';

export const loadLogic = createLogic({
  type: user.load.request,
  warnTimeout: 10000,
  latest: true,
  validate({ action }, allow, reject) {
    hasToken() ? allow(action) : reject();
  },
  process({ api }, dispatch, done) {
    api.user
      .fetch()
      .then((res) => {
        dispatch(user.load.success(res));
        done();
      })
      .catch((err) => {
        dispatch(app.captureError(err, {}));
        dispatch(user.load.failure(err));
        if (err.status) {
          if (err.status === 503 || err.status === 502) {
            dispatch(app.setMaintenance(true));
          } else {
            dispatch(app.setMaintenance(false));
          }
          if (err.status === 401) {
            dispatch(user.logout());
          }
        }
        done();
      });
  },
});

export const logoutLogic = createLogic({
  type: user.logout,
  process({ history }) {
    clearToken();
    history.push('/welcome');
  },
});

export default [loadLogic, logoutLogic];
