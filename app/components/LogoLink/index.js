import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';
import Logo from '-!babel!svg-react!shared/assets/svg/logo.svg'; // eslint-disable-line import/no-webpack-loader-syntax, import/extensions
import { linkStyles, logoStyles } from './styles';

const StyledLink = styled(Link)`${linkStyles}`;
const StyledSvg = styled(Logo)`${logoStyles}`;

const LogoLink = ({ to, size }) => (
  <StyledLink to={to} size={size} title="Return Home">
    <StyledSvg width="100%" height="100%" />
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
