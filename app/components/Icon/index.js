import React from 'react';
import PropTypes from 'prop-types';

import ICONS from './constants';
import { SVGWrapper, SVG } from './styles';

Icon.propTypes = {
  name: PropTypes.oneOf(Object.keys(ICONS)).isRequired,
  inline: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.string,
  isRotating: PropTypes.bool,
};

Icon.defaultProps = {
  inline: true,
  color: 'currentColor',
  size: '1.5em',
  isRotating: false,
};

function Icon({ name, ...props }) {
  const NAME = ICONS[name] || {};
  return (
    <SVGWrapper {...props}>
      <SVG
        title={name}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        viewBox={NAME.viewBox}
      >
        <path d={NAME.path} />
      </SVG>
    </SVGWrapper>
  );
}

export default Icon;
