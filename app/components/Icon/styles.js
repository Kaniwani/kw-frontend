import styled from 'styled-components';
import * as COLORS from 'shared/styles/colors';

export const SVGWrapper = styled.span`
  display: ${({ display }) => display};
  vertical-align: middle;
  align-self: center;
  position: relative;
  width: ${({ size }) => size}; /*CSS instead of html width attr to support non-pixel units*/
  height: ${({ size }) => size}; /*Prevents scaling issue in IE*/
  background-repeat: no-repeat;
  background-color: ${COLORS.transparent};
  color: ${({ color }) => COLORS[color]};
`;

export const SVG = styled.svg`
  display: block;
  pointer-events: none;
  transform-origin: 50% 50% 0px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  fill: currentColor;
`;
