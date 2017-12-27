import { createLogic } from 'redux-logic';
import { clearToken } from 'common/utils/auth';
import { user } from "./actions";

export const loadLogic = createLogic({
  type: user.load.request,
  warnTimeout: 10000,
  latest: true,
  processOptions: {
    successType: user.load.success,
    failType: user.load.failure,
  },
  process({ api }) {
    return api.user.fetch();
  },
});

export const logoutLogic = createLogic({
  type: user.logout,
  process({ history }, dispatch, done) {
    clearToken();
    // FIXME: persistence not cleared zzz
    history.push("/welcome");
    done();
  },
});

export default [
  loadLogic,
  logoutLogic,
];
