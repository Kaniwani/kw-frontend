/**
*
* Icon
*
*/

import React, { PropTypes } from 'react';
import { ICONS } from './constants';

// TODO: change this component to use styled-components

const Icon = ({
  name,
  color = 'currentColor',
  size = '1em',
  viewBox = '0 0 24 24', // polymer default
  preserveAspectRatio = 'xMidYMid meet',
  className,
  style,
}) => {
  const containerStyle = {
    display: 'inline-block',
    verticalAlign: 'middle',
    position: 'relative',
    width: size, // CSS instead of the width attr to support non-pixel units
    height: size, // Prevents scaling issue in IE
    backgroundRepeat: 'no-repeat',
    fill: color,
    transition: 'all 250ms ease-in-out',
  };
  const svgStyle = {
    display: 'block',
    pointerEvents: 'none',
    transformOrigin: '50% 50% 0px',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
  return (
    <span
      style={Object.assign(containerStyle, style)} // allow inline style to be passed from parent and merge
    >
      <svg
        width="100%"
        height="100%"
        style={svgStyle}
        className={className} // allow css modules or parent to provide a classname
        title={name}
        preserveAspectRatio={preserveAspectRatio}
        viewBox={viewBox}
      >
        <path d={ICONS[name]} />
      </svg>
    </span>
  );
};

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.oneOf(Object.keys(ICONS)).isRequired,
  color: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  preserveAspectRatio: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.object,
};

export default Icon;
