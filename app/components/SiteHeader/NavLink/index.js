import React from 'react';
import PropTypes from 'prop-types';
import isNumber from 'lodash/isNumber';

import { Li, Link, LinkButton, Text, Count } from './styles';

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]),
  isDisabled: PropTypes.bool,
  isOffCanvas: PropTypes.bool,
  handleLogout: PropTypes.func.isRequired,
};

NavLink.defaultProps = {
  count: false,
  isDisabled: false,
  isOffCanvas: false,
};

function NavLink({
  to,
  text,
  count,
  isDisabled,
  isOffCanvas,
  handleLogout,
}) {
  return (
    <Li isOffCanvas={isOffCanvas}>
      {to === '/logout' ? (
        <LinkButton onClick={handleLogout}>
          <Text>
            {text}
          </Text>
        </LinkButton>
      ) : (
        <Link
          plainLink
          to={to}
          disabled={isDisabled}
        >
          <Text>
            {text}
            {isNumber(count) && <Count disabled={isDisabled}>{count}</Count>}
          </Text>
        </Link>
        )
      }
    </Li>
  );
}

export default NavLink;
