import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { ICONS } from './constants';

const Wrapper = styled.span`
  display: inline-block;
  vertical-align: middle;
  position: relative;
  width: ${({ iconSize }) => iconSize}; /*CSS instead of html width attr to support non-pixel units*/
  height: ${({ iconSize }) => iconSize}; /*Prevents scaling issue in IE*/
  background-repeat: no-repeat;
  transition: all 200ms ease-in-out;
  fill: ${({ iconColor }) => iconColor};
`;

const SVG = styled.svg`
  display: block;
  pointer-events: none;
  transform-origin: 50% 50% 0px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Icon = ({ color, size, name, ...rest }) => (
  <Wrapper iconColor={color} iconSize={size}>
    <SVG
      title={name}
      width="100%"
      height="100%"
      {...rest}
    >
      <path d={ICONS[name]} />
    </SVG>
  </Wrapper>
);

Icon.propTypes = {
  name: PropTypes.oneOf(Object.keys(ICONS)).isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  viewBox: PropTypes.string,
  preserveAspectRatio: PropTypes.string,
};

Icon.defaultProps = {
  color: 'currentColor',
  size: '1em',
  viewBox: '0 0 24 24', // polymer default
  preserveAspectRatio: 'xMidYMid meet',
};

export default Icon;
