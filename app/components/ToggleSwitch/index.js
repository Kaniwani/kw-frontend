import React from 'react';
import PropTypes from 'prop-types';

import * as COLORS from 'shared/styles/colors';
import { Input } from './styles';

ToggleSwitch.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  toggleOnColor: PropTypes.oneOf(Object.keys(COLORS)),
  toggleOffColor: PropTypes.oneOf(Object.keys(COLORS)),
};

ToggleSwitch.defaultProps = {
  width: '6rem',
  height: '2rem',
  toggleOnColor: 'green',
  toggleOffColor: 'red',
};

function ToggleSwitch({ checked, onChange, id, name, ...props }) {
  return (
    <Input
      type="checkbox"
      id={id}
      name={name}
      checked={checked}
      onChange={onChange}
      {...props}
    />
  );
}

export default ToggleSwitch;
