import React from 'react';
import PropTypes from 'prop-types';

import ICONS from './constants';
import { SVGWrapper, SVG } from './styles';

Icon.propTypes = {
  name: PropTypes.oneOf(Object.keys(ICONS)).isRequired,
  display: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  preserveAspectRatio: PropTypes.string,
};

Icon.defaultProps = {
  display: 'inline-block',
  color: 'currentColor',
  size: '1em',
  preserveAspectRatio: 'xMidYMid meet',
};

function Icon({ name, display, color, size, preserveAspectRatio, ...props }) {
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
        viewBox={ICONS[name].viewBox}
        preserveAspectRatio={preserveAspectRatio}
      >
        {ICONS[name].path}
      </SVG>
    </SVGWrapper>
  );
}

export default Icon;
