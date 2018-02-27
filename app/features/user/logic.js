import { createLogic } from 'redux-logic';
import { clearToken } from 'common/utils/auth';

import { app } from 'common/actions';
import { user } from './actions';

export const loadLogic = createLogic({
  type: user.load.request,
  warnTimeout: 10000,
  latest: true,
  process({ api }, dispatch, done) {
    api.user
      .fetch()
      .then((res) => {
        dispatch(user.load.success(res));
        done();
      })
      .catch((err) => {
        dispatch(user.load.failure(err));
        if (!Object.keys(err).length || err.status === 500) {
          dispatch(app.maintenanceMode(true));
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
