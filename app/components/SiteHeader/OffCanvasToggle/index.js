import React from 'react';
import PropTypes from 'prop-types';
import { branch, renderNothing } from 'recompose';

import { Toggle, ToggleDot } from './styles';

OffCanvasToggle.propTypes = {
  isActive: PropTypes.bool,
  ariaControls: PropTypes.string.isRequired,
  handleToggle: PropTypes.func.isRequired,
};

OffCanvasToggle.defaultProps = {
  isActive: false,
};

function OffCanvasToggle({ isActive, handleToggle, ariaControls }) {
  return (
    <Toggle
      type="button"
      aria-label="navigation menu"
      aria-controls={ariaControls}
      aria-expanded={isActive}
      onClick={handleToggle}
    >
      <ToggleDot />
      <ToggleDot />
      <ToggleDot />
    </Toggle>
  );
}

const isHidden = ({ isVisible }) => !isVisible;
const enhance = branch(
  isHidden,
  renderNothing,
);

export default enhance(OffCanvasToggle);
