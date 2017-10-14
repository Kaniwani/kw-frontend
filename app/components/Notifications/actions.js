import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from './constants';

// Example options
// https://github.com/igorprado/react-notification-system#creating-a-notification// {
//   title: 'Hey, it\'s good to see you!',
//   message: 'Now you can see how easy it is to use notifications in React!',
//   position: 'tr',
//   autoDismiss: 0,
//   dismissible: true,
//   action: {
//     label: 'Awesome!',
//     callback: function() {
//       console.log('Clicked');
//     }
//   }
// }
//

export function show(opts = {}, level = 'success') {
  return {
    type: SHOW_NOTIFICATION,
    ...opts,
    uid: opts.uid || Date.now(),
    level,
  };
}

export function success(opts) {
  return show({ ...opts, autoDismiss: 2 }, 'success');
}

export function info(opts) {
  return show({ ...opts, autoDismiss: 4 }, 'info');
}

export function error(opts) {
  // TODO: log errors to server, perhaps include a 'type' (api, misc etc) in payload and filter by that
  // yield call(ServerLog, { title, message, error });
  // https://rollbar.com/
  console.error(opts.error); // eslint-disable-line no-console
  return show({ ...opts, autoDismiss: 0 }, 'error');
}

export function warning(opts) {
  // TODO: log errors to server, perhaps include a 'type' (api, misc etc) in payload and filter by that
  // yield call(ServerLog, { title, message, error });
  // https://rollbar.com/
  console.warning(opts.warning); // eslint-disable-line no-console
  return show({ ...opts, autoDismiss: 8 }, 'warning');
}

export function hide(uid) {
  return {
    type: HIDE_NOTIFICATION,
    uid,
  };
}
