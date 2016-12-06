import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styled from 'styled-components';
import { KEYS } from 'shared/constants';
import selectModal from './selectors';

import {
  hideModal,
} from './actions';

const cssTransitionGroupDefaultProps = {
  component: 'div',
  transitionEnterTimeout: 500,
  transitionLeaveTimeout: 500,
  transitionName: {
    enter: 'enter',
    enterActive: 'enterActive',
    leave: 'leave',
    leaveActive: 'leaveActive',
  },
};

export class Modal extends React.PureComponent {
  static propTypes = {
    // 1. ATTRIBUTE PROPS
    // An object that maps each `modalType` to the corresponding modal component.
    children: PropTypes.objectOf(PropTypes.func),
    // Classes for the subcomponents.
    contentClassName: PropTypes.string,
    contentWrapperClassName: PropTypes.string,
    overlayClassName: PropTypes.string,
    middleAlignedClassName: PropTypes.string,
    // A function that returns the `Close` button component.
    renderCloseButton: PropTypes.func,

    // 2. INJECTED PROPS
    // Whether the modal is visible.
    isVisible: PropTypes.bool.isRequired,
    // The modal type. Will be `null` if no modal is being rendered.
    modalType: PropTypes.string,
    // Props spread over the current modal component (ie. one of the components
    // in `children`).
    modalProps: PropTypes.object.isRequired,
    // Whether to render a close button (using `renderCloseButton`).
    hasCloseButton: PropTypes.bool,
    // Whether to middle-align the modal.
    isMiddleAligned: PropTypes.bool,
    // Whether to hide the modal when the overlay is clicked.
    shouldHideOnOverlayClick: PropTypes.bool,
    // Whether to hide the modal when the `Esc` key is pressed.
    shouldHideOnEscapeKeyDown: PropTypes.bool,
    // Dispatch an action to hide the modal.
    hideModal: PropTypes.func.isRequired,
    // Dispatch an action to show the modal.
    showModal: PropTypes.func.isRequired,

  };

  static defaultProps = {
    children: [],
    renderCloseButton: (hideModal) => <button onClick={hideModal}>Close</button>,
  };
  // Update `overflow` of `document.body` if modal visibility has changed.
  componentWillUpdate(nextProps) {
    const { isVisible } = nextProps;
    if (isVisible !== this.props.isVisible) {
      document.body.style.overflow = isVisible ? 'hidden' : null;
    }
  }

  // If modal is now visible, `focus` it, else `blur` it.
  componentDidUpdate() {
    this.contentWrapper[this.props.isVisible ? 'focus' : 'blur']();
  }

  // Hide the modal if the `Esc` key was pressed.
  hideOnEscapeKeyDown = (event) => {
    if (event.which === KEYS.ESCAPE) { // was keyCode before..
      this.props.hideModal();
    }
  };

  // Hide the modal if the overlay was clicked.
  hideOnOverlayClick = (event) => {
    if (event.target === this.contentWrapper) {
      this.props.hideModal();
    }
  };


  render() {
    const {
      children,
      contentClassName,
      contentWrapperClassName,
      overlayClassName,
      middleAlignedClassName,
      renderCloseButton,
      isVisible,
      modalType,
      modalProps,
      hasCloseButton,
      isMiddleAligned,
      shouldHideOnOverlayClick,
      shouldHideOnEscapeKeyDown,
      hideModal,
      showModal,
      ...other
    } = this.props;

    const cssTransitionGroupProps = {
      ...cssTransitionGroupDefaultProps,
      ...other,
    };

    const modal = children[modalType];
    const props = {
      ...modalProps,
      hideModal,
      showModal,
    };

    const Overlay = '';

    return (
      <ReactCSSTransitionGroup {...cssTransitionGroupProps}>
        {isVisible && modal &&
          <div>
            <Overlay />
            <div // eslint-disable-line jsx-a11y/no-static-element-interactions
              onClick={shouldHideOnOverlayClick && this.hideOnOverlayClick}
              onKeyDown={shouldHideOnEscapeKeyDown && this.hideOnEscapeKeyDown}
              ref={(node) => { this.contentWrapper = node; }}
              tabIndex={-1} // NOTE: might have to change to "1"
            >
              <div className={contentClassName}>
                {React.createElement(modal, props)}
                {hasCloseButton && renderCloseButton(hideModal)}
              </div>
            </div>
          </div>}
      </ReactCSSTransitionGroup>
    );
  }
}

const mapStateToProps = selectModal();

function mapDispatchToProps(dispatch) {
  return {
    hideModal: () => dispatch(hideModal()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
