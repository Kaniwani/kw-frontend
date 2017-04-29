import React from 'react';
import PropTypes from 'prop-types';

import { StyledLink, StyledSvg } from './styles';

LogoLink.propTypes = {
  to: PropTypes.string,
  size: PropTypes.string,
};

LogoLink.defaultProps = {
  to: '/',
  size: '4rem',
};

function LogoLink({ to, size }) {
  return (
    <StyledLink to={to} size={size} title="Return Home">
      <StyledSvg width="100%" height="100%" />
    </StyledLink>
  );
}

export default LogoLink;
