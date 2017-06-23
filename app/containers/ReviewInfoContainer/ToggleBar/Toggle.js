import React from 'react';
import PropTypes from 'prop-types';
import { ToggleButton } from './styles';

Toggle.propTypes = {
  isActive: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

function Toggle({ isActive, isDisabled, handleClick, children }) {
  return (
    <ToggleButton
      onClick={handleClick}
      isActive={isActive}
      disabled={isDisabled} // html attr -> css:pseudo
    >
      {children}
    </ToggleButton>
  );
}


export default Toggle;
