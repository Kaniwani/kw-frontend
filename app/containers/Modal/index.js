import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { KEYS } from 'shared/constants';
import selectModal from './selectors';
import Overlay from './Overlay';
import ContentWrapper from './ContentWrapper';
import Content from './Content';
import CloseButton from './CloseButton';

import {
  hideModal,
} from './actions';

/*
// Animation...
  .enterActive .content, .leaveActive .content {
    transition: all .2s ease-in-out;
    transition-property: opacity, top;
  }
  .enter .content {opacity: 0; top: 10px; }
  .enterActive .content {opacity: 1; top: 0; }
  .leave .content {opacity: 1; top: 0; }
  .leaveActive .content {opacity: 0; top: 10px; }
  .enterActive .overlay, .leaveActive .overlay {
    transition: all .5s ease-in-out;
    transition-property: opacity;
  }
  .enter .overlay {opacity: 0; }
  .enterActive .overlay  {opacity: 1; }
  .leave .overlay {opacity: 1; }
  .leaveActive .overlay {opacity: 0; }
 */

export class Modal extends React.PureComponent {
  // TODO: pull data from jisho?
  // TODO: change to relevant field
  componentDidUpdate() {
    if (this.props.isVisible) this.contentWrapper.focus();
  }

  // Hide the modal if the `Esc` key was pressed.
  hideOnEscapeKeyDown = (event) => {
    if (event.which === KEYS.ESCAPE) this.props.closeModal();
  };

  // Hide the modal if the overlay was clicked.
  hideOnOverlayClick = (event) => {
    if (event.target === this.contentWrapper) this.props.closeModal();
  };

  render() {
    const {
      children,
      isVisible,
      contentProps,
      closeModal,
//      ...rest
    } = this.props;

    const props = {
      ...contentProps,
      closeModal, // to be used with onSubmit() in modal content / although probably better to dispatch action from saga??
    };

    return (
      isVisible ?
        <div>
          <Overlay />
          <ContentWrapper // eslint-disable-line jsx-a11y/no-static-element-interactions
            onClick={this.hideOnOverlayClick}
            onKeyDown={this.hideOnEscapeKeyDown}
            innerRef={(node) => { this.contentWrapper = node; }}
            tabIndex={-1} // NOTE: might have to change to "1" or "0"
          >
            <Content>
              {React.createElement(children, props)}
              <CloseButton type="button" onClick={closeModal}>Close</CloseButton>
            </Content>
          </ContentWrapper>
        </div>
      : null
    );
  }
}

Modal.propTypes = {
  // 1. ATTRIBUTE PROPS
  // The component(s) to render inside the Modal
  children: PropTypes.func,

  // 2. INJECTED PROPS
  // Whether the modal is visible.
  isVisible: PropTypes.bool.isRequired,
  // Props spread over the current modal component (ie. one of the components in `children`).
  contentProps: PropTypes.object,
  // Dispatch an action to hide the modal.
  closeModal: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  isVisible: false,
};

const mapStateToProps = selectModal();

function mapDispatchToProps(dispatch) {
  return {
    closeModal: () => dispatch(hideModal()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
