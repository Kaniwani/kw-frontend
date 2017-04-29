import { Link } from 'react-router';
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


export const StyledLink = styled(Link)`${linkStyle}`;
export const StyledSvg = styled(Logo)`${logoStyle}`;
