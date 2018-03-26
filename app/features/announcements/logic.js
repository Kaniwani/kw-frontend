import { createLogic } from 'redux-logic';

import { app } from 'common/actions';
import { selectAnnouncementsShouldLoad } from './selectors';
import announcements from './actions';

export const loadLogic = createLogic({
  type: announcements.load.request,
  warnTimeout: 5000,
  validate({ getState, action }, allow, reject) {
    !!action.payload.force || selectAnnouncementsShouldLoad(getState()) ? allow(action) : reject();
  },
  process({ api, serializers: { serializeAnnouncementsResponse } }, dispatch, done) {
    api.announcements
      .fetchAll()
      .then((res) => {
        dispatch(announcements.load.success(serializeAnnouncementsResponse(res)));
        done();
      })
      .catch((err) => {
        dispatch(app.captureError(err));
        dispatch(announcements.load.failure(err));
        done();
      });
  },
});

export default [loadLogic];
