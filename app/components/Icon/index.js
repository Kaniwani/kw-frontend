import React from 'react';
import PropTypes from 'prop-types';

import * as COLORS from 'shared/styles/colors';
import ICONS from './constants';
import { SVGWrapper, SVG } from './styles';

Icon.propTypes = {
  display: PropTypes.string,
  name: PropTypes.oneOf(Object.keys(ICONS)).isRequired,
  color: PropTypes.oneOf(Object.keys(COLORS)),
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

Icon.defaultProps = {
  display: 'inline-block',
  color: 'currentColor',
  size: '1.5em',
};

function Icon({ name, display, color, size, ...props }) {
  return (
    <SVGWrapper
      display={display}
      color={color}
      size={size}
      {...props}
    >
      <SVG
        title={name}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        viewBox={ICONS[name].viewBox}
      >
        {ICONS[name].path}
      </SVG>
    </SVGWrapper>
  );
}

export default Icon;
