import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';
import Logo from '-!babel!svg-react!shared/assets/svg/logo.svg'; // eslint-disable-line import/no-webpack-loader-syntax, import/extensions
import { blueLight, purpleLight, pink } from 'shared/styles/colors';
import { media } from 'shared/styles/media';
import { padding } from 'shared/styles/sizing';


const StyledLink = styled(Link)`
  display: block;
  width: ${(props) => props.size};
  height: auto;
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

const StyledSvg = styled(Logo)`
  width: 100%;
  height: 100%;
  /* Slim down top/bottom margins since the svg logo already has a lot of padding inherently */
  margin-top: -${padding.mobile.inner.y / 2}rem;
  margin-bottom: -${padding.mobile.inner.y / 2}rem;
  ${media('min').sm`
    margin-top: -${padding.desktop.inner.y / 2}rem;
    margin-bottom: -${padding.desktop.inner.y / 2}rem;
  `}

  .bg {
    color: inherit;
    fill: currentColor;
  }
`;

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
