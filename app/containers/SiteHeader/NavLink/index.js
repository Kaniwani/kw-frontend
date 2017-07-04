import React from 'react';
import PropTypes from 'prop-types';

import { Li, Link, LinkButton, Text, Count } from './styles';

NavLink.propTypes = {
  text: PropTypes.string.isRequired,
  isOffCanvas: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
  count: PropTypes.number,
};

function NavLink({
  text,
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
          to={`/${text}`}
        >
          <Text>
            {text}
            {count > 0 && <Count disabled={count < 1}>{count}</Count>}
          </Text>
        </Link>
        )
      }
    </Li>
  );
}

export default NavLink;
