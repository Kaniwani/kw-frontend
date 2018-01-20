import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { whiteLight } from 'shared/styles/colors';

import IconButton from 'components/IconButton';

// NOTE: this is more of a reference as to how ReactDOM.createPortal() works
// probably worth pulling in a react modal lib that uses it (and has keybindings for esc key to close etc, etc)

const Mask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 2px;
  ${({ overlayActive }) => !overlayActive && 'display: none;'};
`;

const Overlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 3vmin;
  left: 3vmin;
  height: calc(100% - 6vmin);
  width: calc(100% - 6vmin);
  background-color: ${whiteLight};
  opacity: 0.9;
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 4px;
  right: 4px;
`;

class OverlayPortal extends React.Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
  };

  state = {
    overlayActive: true,
  };

  componentWillMount() {
    this.overlayContainer = document.createElement('div');
    this.overlayContainer.setAttribute('id', 'overlayPortalContainer');
    document.body.appendChild(this.overlayContainer);
  }

  componentWillUnmount() {
    document.body.removeChild(this.overlayContainer);
  }

  closeOverlay = () => {
    this.setState({ overlayActive: false });
  };

  render() {
    return createPortal(
      <Mask overlayActive={this.state.overlayActive} onClick={this.closeOverlay}>
        <Overlay>
          <CloseButton name="CLOSE" title="Close Overlay" onClick={this.closeOverlay} />
          {this.props.children}
        </Overlay>
      </Mask>,
      this.overlayContainer
    );
  }
}

export default OverlayPortal;
