// https://github.com/igorprado/react-notification-system#styles
// https://github.com/igorprado/react-notification-system#disabling-inline-styles

export default {
  NotificationItem: { // Override the notification item
    DefaultStyle: { // Applied to every notification, regardless of the notification level
      margin: '10px 5px 2px 1px',
      height: 'auto',
    },

    success: { // Applied only to the success notification item
      // color: `${green}`,
    },
  },
};
