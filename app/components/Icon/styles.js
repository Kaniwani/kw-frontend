import styled from 'styled-components';
import { transparent } from 'shared/styles/colors';

export const SVGWrapper = styled.span`
  ${({ inline }) => inline ? `
    display: inline-block;
    vertical-align: middle;
  ` : `
    display: block;
    align-self: center;
  `}
  position: relative;
  width: ${({ size }) => size}; /*CSS instead of html width attr to support non-pixel units*/
  height: ${({ size }) => size}; /*Prevents scaling issue in IE*/
  background-repeat: no-repeat;
  background-color: ${transparent};
  color: ${({ color }) => color};
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
