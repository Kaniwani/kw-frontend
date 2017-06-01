import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import NotifySystem from 'react-notification-system';

import { selectNotifications } from './selectors';
import style from './styles';
import * as actions from './actions';

class Notifications extends React.PureComponent {
  static propTypes = {
    notifications: PropTypes.array.isRequired,
    hideNotification: PropTypes.func.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    const { notifications } = nextProps;
    const notificationIds = notifications.map(notification => notification.uid);

    // Get all active notifications from react-notification-system
    // and remove all where uid is not found in the reducer
    (this.system().state.notifications || []).forEach((notification) => {
      if (notificationIds.indexOf(notification.uid) < 0) {
        this.system().removeNotification(notification.uid);
      }
    });

    notifications.forEach((notification) => {
      this.system().addNotification({
        ...notification,
        onRemove: () => {
          this.props.hideNotification(notification.uid);
          if (notification.onRemove) {
            notification.onRemove();
          }
        },
      });
    });
  }

  system() {
    return this.notify;
  }

  render() {
    return (
      <NotifySystem
        ref={(node) => { this.notify = node; }}
        notifications={this.props.notifications}
        style={style}
      />
    );
  }
}

// Tie actions to Notifications component instance
// so they can be called by Notifications.show() etc.
Object.keys(actions).forEach((key) => {
  Notifications[key] = actions[key];
});

const mapStateToProps = () => createStructuredSelector({
  notifications: selectNotifications(),
});

const mapDispatchToProps = dispatch => ({
  hideNotification: id => dispatch(actions.hide(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
