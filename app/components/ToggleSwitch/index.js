import React from 'react';
import PropTypes from 'prop-types';

import withToggle from 'decorators/withToggle';
import * as COLORS from 'shared/styles/colors';
import { Input } from './styles';

const ToggleSwitch = withToggle(({ isToggled, toggle, id, name, ...props }) => (
  <Input
    type="checkbox"
    id={id}
    name={name}
    checked={isToggled}
    onChange={toggle}
    {...props}
  />)
);

ToggleSwitch.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
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


export default ToggleSwitch;
