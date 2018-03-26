import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPortal } from 'react-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { POSITIONS } from '../constants';
import actions from '../actions';
import Notification from '../Notification';
import { Container, Wrapper } from './styles';

export class Notify extends React.PureComponent {
  static propTypes = {
    notifications: PropTypes.array.isRequired,
    remove: PropTypes.func.isRequired,
    transitionDurations: PropTypes.shape({
      enter: PropTypes.number,
      exit: PropTypes.number,
    }),
    position: PropTypes.string,
    node: PropTypes.any,
  };

  static defaultProps = {
    transitionDurations: {
      enter: 160,
      exit: 240,
    },
    position: POSITIONS.TOP_RIGHT,
  };

  componentWillUnmount() {
    if (this.defaultNode) {
      document.body.removeChild(this.defaultNode);
    }
    this.defaultNode = null;
  }

  handleDismiss = (id) => {
    this.props.remove(id);
  };

  renderNotification() {
    const { notifications, transitionDurations, position, ...props } = this.props;

    return (
      <TransitionGroup component={Container} position={position}>
        {notifications.map((notification, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <CSSTransition classNames="slide" key={index} timeout={transitionDurations}>
            <Wrapper>
              <Notification
                key={notification.id}
                {...props}
                {...notification}
                handleDismiss={this.handleDismiss}
              />
            </Wrapper>
          </CSSTransition>
        ))}
      </TransitionGroup>
    );
  }

  render() {
    if (!this.props.node && !this.defaultNode) {
      /* eslint-disable no-undef */
      this.defaultNode = document.createElement('div');
      document.body.appendChild(this.defaultNode);
    }

    return createPortal(this.renderNotification(), this.props.node || this.defaultNode);
  }
}

const mapStateToProps = (state) => ({
  notifications: state.notifications,
});

const mapDispatchToProps = {
  remove: actions.remove,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notify);
