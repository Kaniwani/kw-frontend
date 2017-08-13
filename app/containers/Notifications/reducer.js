import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from './constants';

export default function Notifications(state = [], action = {}) {
  switch (action.type) {
    case SHOW_NOTIFICATION: {
      const { type, ...rest } = action; // eslint-disable-line no-unused-vars
      return state.concat({ ...rest, uid: action.uid });
    }
    case HIDE_NOTIFICATION:
      return state.filter((notification) => notification.uid !== action.uid);
    default:
      return state;
  }
}
