import React, { PropTypes } from 'react';
import { Toggle, ToggleDot } from './styles';

function NavToggle({ active }) {
  return (
    <Toggle className={active ? 'is-active' : ''}>
      <ToggleDot />
      <ToggleDot />
      <ToggleDot />
    </Toggle>
  );
}

NavToggle.propTypes = {
  active: PropTypes.bool,
};

export default NavToggle;
