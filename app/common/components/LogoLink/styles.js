import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { timingFunctions } from 'polished';

import Logo from '-!babel-loader!svg-react-loader!common/assets/img/logo.svg';
import { blueLight, purpleLight, pink } from 'common/styles/colors';

const linkStyle = css`
  display: block;
  position: relative;
  vertical-align: middle;
  align-self: center;
  flex: 0 0 auto;
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


export const RouterLink = styled(Link)`${linkStyle}`;
export const Svg = styled(Logo)`${logoStyle}`;
