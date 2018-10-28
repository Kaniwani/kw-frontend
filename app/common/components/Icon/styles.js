import styled, { css } from 'styled-components';
import { transparent } from 'common/styles/colors';
import { spin } from 'common/styles/animation';

export const SVGWrapper = styled.span`
  ${({ inline }) => inline ? css`
    display: inline-block;
    vertical-align: middle;
  ` : css`
    display: block;
    align-self: center;
  `}
  position: relative;
  width: ${({ size }) => size}; /*CSS instead of html width attr to support non-pixel units*/
  height: ${({ size }) => size}; /*Prevents scaling issue in IE*/
  background-repeat: no-repeat;
  background-color: ${transparent};
  color: ${({ color }) => color};
  flex-shrink: 0;
  ${({ isRotating }) => isRotating && css`animation: ${spin} 1.25s linear infinite;`};
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
