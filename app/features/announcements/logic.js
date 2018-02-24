import { createLogic } from 'redux-logic';

import announcements from './actions';

export const loadLogic = createLogic({
  type: announcements.load.request,
  warnTimeout: 5000,
  latest: true,
  process({ api }, dispatch, done) {
    api.announcements
      .fetchAll()
      .then((res) => {
        dispatch(announcements.load.success(res));
        done();
      })
      .catch((err) => {
        dispatch(announcements.load.failure(err));
        done();
      });
  },
});

export default [loadLogic];
