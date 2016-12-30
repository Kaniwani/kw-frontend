import React, { PropTypes } from 'react';
import { Toggle, ToggleDot } from './styles';

function NavToggle({ active, handleClick }) {
  return (
    <Toggle type="button" className={active ? 'is-active' : ''} onClick={handleClick}>
      <ToggleDot />
      <ToggleDot />
      <ToggleDot />
    </Toggle>
  );
}

NavToggle.propTypes = {
  active: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
};

export default NavToggle;
