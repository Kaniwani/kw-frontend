import React from 'react';
import PropTypes from 'prop-types';

import * as COLORS from 'shared/styles/colors';
import ICONS from './constants';
import { SVGWrapper, SVG } from './styles';

Icon.propTypes = {
  name: PropTypes.oneOf(Object.keys(ICONS)).isRequired,
  inline: PropTypes.bool,
  color: PropTypes.oneOf(Object.keys(COLORS)),
  size: PropTypes.string,
};

Icon.defaultProps = {
  inline: true,
  color: 'currentColor',
  size: '1.5em',
};

function Icon({ name, inline, color, size, ...props }) {
  const NAME = ICONS[name] || {};
  return (
    <SVGWrapper
      inline={inline}
      color={color}
      size={size}
      {...props}
    >
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
