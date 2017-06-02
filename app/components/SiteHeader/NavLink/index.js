import React from 'react';
import PropTypes from 'prop-types';
import isNumber from 'lodash/isNumber';

import { Li, RouterLink, Text, Count } from './styles';

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
    <Li isOffCanvas={isOffCanvas}>
      <RouterLink
        to={to}
        disabled={isDisabled}
      >
        <Text>
          {text}
          {isNumber(count) && <Count disabled={isDisabled}>{count}</Count>}
        </Text>
      </RouterLink>
    </Li>
  );
}

export default NavLink;
