import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';
import Img from 'components/Img';
import Logo from 'shared/assets/svg/logo.svg';
import { logoBackground, purpleLight } from 'shared/styles/colors';

const StyledLink = styled(Link)`
  display: block;
  width: ${(props) => props.size};
  height: auto;
  color: rgb(${logoBackground});
  transition: color .7s ease;
  &:hover {
    transition: color .8s ease-out;
    color: rgb(${purpleLight});
  }
`;

const StyledSvg = styled.svg`
  width: 100%;
  height: 100%;

  .bg {
    color: inherit;
    fill: currentColor;
  }
`;

// FIXME: svg using <Icon /> with hover fill color change
const LogoLink = ({ to, size }) => (
  <StyledLink to={to} size={size} title="Return Home">
    <StyledSvg />
  </StyledLink>
);

LogoLink.propTypes = {
  to: PropTypes.string,
  size: PropTypes.string,
};

LogoLink.defaultProps = {
  to: '/',
  size: '1em',
};

export default LogoLink;
