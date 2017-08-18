import React from 'react';
import PropTypes from 'prop-types';

import { Li, Link, LinkButton, Text, Count } from './styles';

NavLink.propTypes = {
  text: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  isOffCanvas: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
  count: PropTypes.number,
};

NavLink.defaultProps = {
  count: 0,
};

function NavLink({
  text,
  route,
  count,
  isOffCanvas,
  handleLogout,
}) {
  return (
    <Li isOffCanvas={isOffCanvas}>
      {text === 'logout' ? (
        <LinkButton onClick={handleLogout}>
          <Text>
            {text}
          </Text>
        </LinkButton>
      ) : (
        <Link
          plainLink
          to={route}
        >
          <Text>
            {text}
            {count > 0 && <Count disabled={count < 1}>{count}</Count>}
          </Text>
        </Link>
      )}
    </Li>
  );
}

export default NavLink;
