import React from 'react';
import PropTypes from 'prop-types';
import isNumber from 'lodash/isNumber';

import { Li, Link, Text, Count } from './styles';

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]),
  isDisabled: PropTypes.bool,
  isOffCanvas: PropTypes.bool,
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
}) {
  return (
    <Li className={isOffCanvas && 'is-off-canvas'}>
      <Link
        plainLink
        to={to}
        activeClassName="is-active"
        disabled={isDisabled}
      >
        <Text className="NavLink__Text">
          {text}
          {isNumber(count) && <Count isDisabled={isDisabled}>{count}</Count>}
        </Text>
      </Link>
    </Li>
  );
}

export default NavLink;
