import React from 'react';
import PropTypes from 'prop-types';

import { RouterLink, Svg } from './styles';

LogoLink.propTypes = {
  to: PropTypes.string,
  size: PropTypes.string,
};

LogoLink.defaultProps = {
  to: '/',
  size: '4.5rem',
};

function LogoLink({ to, size }) {
  return (
    <RouterLink to={to} size={size} title="Return Home">
      <Svg width="100%" height="100%" />
    </RouterLink>
  );
}

export default LogoLink;
