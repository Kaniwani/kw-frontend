import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

import { Li, Link, LinkButton, Text, Count } from './styles';

NavLink.propTypes = {
  text: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  isOffCanvas: PropTypes.bool,
  count: PropTypes.number,
};

NavLink.defaultProps = {
  count: 0,
  isOffCanvas: false,
  handleLogout: noop,
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
