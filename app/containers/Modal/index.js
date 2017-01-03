import React, { PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { KEYCODES } from 'shared/constants';
import Icon from 'components/Icon';
import { modals } from './constants';
import {
  Overlay,
  ContentWrapper,
  Content,
  CloseButton,
} from './styles';
import {
  selectVisible,
  selectContentProps,
  selectModalType,
} from './selectors';
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
  // Hide the modal if the `Esc` key was pressed.
  hideOnEscapeKeyDown = (event) => {
    if (event.which === KEYCODES.ESCAPE) this.props.closeModal();
  };

  // Hide the modal if the overlay was clicked.
  hideOnOverlayClick = (event) => {
    if (event.target === this.contentWrapper) this.props.closeModal();
  };

  render() {
    const {
      isVisible,
      modalType,
      contentProps,
      closeModal,
//      ...rest
    } = this.props;

    const ModalContent = modals[modalType];
    const modalContentProps = {
      ...contentProps,
      closeModal,
      isVisible,
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
              <ModalContent {...modalContentProps} />
              <CloseButton type="button" onClick={closeModal}>
                <Icon name="CLOSE" size="1.5em" />
              </CloseButton>
            </Content>
          </ContentWrapper>
        </div>
      : null
    );
  }
}

Modal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  modalType: PropTypes.string,
  contentProps: PropTypes.object,
  closeModal: PropTypes.func.isRequired,
};

// Modal.defaultProps = {
//   isVisible: false,
// };

const mapStateToProps = createStructuredSelector({
  isVisible: selectVisible(),
  modalType: selectModalType(),
  contentProps: selectContentProps(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeModal: () => dispatch(hideModal()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
