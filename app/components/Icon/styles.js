import styled from 'styled-components';
import { transparent } from 'shared/styles/colors';

export const SVGWrapper = styled.span`
  display: ${({ inline }) => inline ? 'inline-' : ''}block;
  vertical-align: middle;
  align-self: center;
  position: relative;
  width: ${({ iconSize }) => iconSize}; /*CSS instead of html width attr to support non-pixel units*/
  height: ${({ iconSize }) => iconSize}; /*Prevents scaling issue in IE*/
  background-repeat: no-repeat;
  background-color: ${transparent};
  transition: all 200ms ease-in-out;
  color: ${({ iconColor }) => iconColor};
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
