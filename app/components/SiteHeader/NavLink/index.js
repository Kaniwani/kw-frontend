import React from 'react';
import PropTypes from 'prop-types';
import isNumber from 'lodash/isNumber';

import { Li, Link, LinkButton, Text, Count } from './styles';

NavLink.propTypes = {
  text: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]),
  isOffCanvas: PropTypes.bool,
  handleLogout: PropTypes.func.isRequired,
};

NavLink.defaultProps = {
  count: false,
  isOffCanvas: false,
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
            {isNumber(count) && <Count disabled={count < 1}>{count}</Count>}
          </Text>
        </Link>
        )
      }
    </Li>
  );
}

export default NavLink;
