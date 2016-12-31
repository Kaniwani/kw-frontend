import { css } from 'styled-components';
import { blueLight, purpleLight, pink } from 'shared/styles/colors';

export const linkStyles = css`
  display: block;
  vertical-align: middle;
  align-self: center;
  position: relative;
  width: ${({ size }) => size}; /*CSS instead of html width attr to support non-pixel units*/
  height: ${({ size }) => size}; /*Prevents scaling issue in IE*/
  background-repeat: no-repeat;
  transition: all 200ms ease-in-out;
  color: rgb(${blueLight});
  transition: color .7s ease;

  &:hover {
    transition: color .4s ease-out;
    color: rgb(${purpleLight});
  }

  &:active {
    transition: color .1s ease-out;
    color: rgb(${pink});
  }
`;

export const logoStyles = css`
  display: block;
  pointer-events: none;
  transform-origin: 50% 50% 0px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  .bg {
    color: inherit;
    fill: currentColor;
  }
`;
