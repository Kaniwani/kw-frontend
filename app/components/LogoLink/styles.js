import { Link as RouterLink } from 'react-router';
import styled, { css } from 'styled-components';
import { timingFunctions } from 'polished';

import Logo from '-!babel-loader!svg-react-loader!shared/assets/img/logo.svg';
import { blueLight, purpleLight, pink } from 'shared/styles/colors';

const linkStyle = css`
  display: block;
  vertical-align: middle;
  align-self: center;
  position: relative;
  width: ${({ size }) => size}; /*CSS instead of html width attr to support non-pixel units*/
  height: ${({ size }) => size}; /*Prevents scaling issue in IE*/
  background-repeat: no-repeat;
  color: ${blueLight};
  cursor: pointer;
  transition: color .4s ${timingFunctions('easeInOutSine')};

  &:hover {
    transition: color .5s ${timingFunctions('easeOutQuad')};
    color: ${purpleLight};
  }

  &:active {
    transition: color .1s ${timingFunctions('easeOutQuad')};
    color: ${pink};
  }
`;

const logoStyle = css`
  display: block;
  position: absolute;
  transform-origin: 50% 50% 0px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  .bg {
    color: inherit;
    fill: currentColor;
  }
`;


export const Link = styled(RouterLink)`${linkStyle}`;
export const Svg = styled(Logo)`${logoStyle}`;
