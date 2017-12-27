import { createLogic } from "redux-logic";

import announcements from "./actions";
import { selectAnnouncementsShouldLoad } from "./selectors";

export const loadLogic = createLogic({
  type: announcements.load.request,
  warnTimeout: 5000,
  latest: true,
  processOptions: {
    successType: announcements.load.success,
    failType: announcements.load.failure,
  },
  validate({ getState, action }, allow, reject) {
    return selectAnnouncementsShouldLoad(getState()) ? allow(action) : reject();
  },
  process({ api }) {
    return api.announcements.fetchAll();
  },
});

export default [loadLogic];
