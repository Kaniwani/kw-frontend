import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { timingFunctions } from 'polished';

import Logo from '-!babel-loader!svg-react-loader!common/assets/img/logo.svg';
import { purple, pink } from 'common/styles/colors';

const linkStyle = css`
  display: block;
  position: relative;
  align-self: center;
  flex: 0 0 auto;
  width: ${({ size }) => size}; /*CSS instead of html width attr to support non-pixel units*/
  height: ${({ size }) => size}; /*Prevents scaling issue in IE*/
  background-repeat: no-repeat;
  color: ${purple[3]};
  cursor: pointer;
  transition: color .4s ${timingFunctions('easeInOutSine')};

  &:hover {
    transition: color .5s ${timingFunctions('easeOutQuad')};
    color: ${purple[5]};
  }

  &:active {
    transition: color .1s ${timingFunctions('easeOutQuad')};
    color: ${pink[5]};
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


export const StyledLink = styled(Link)`${linkStyle}`;
export const Svg = styled(Logo)`${logoStyle}`;
