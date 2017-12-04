import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

import { Li, Link, LinkButton, Text, Count } from './styles';

NavLink.propTypes = {
  text: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  handleLogout: PropTypes.func,
  isOffCanvas: PropTypes.bool,
  count: PropTypes.number,
  disabled: PropTypes.bool,
};

NavLink.defaultProps = {
  count: 0,
  isOffCanvas: false,
  handleLogout: noop,
  disabled: false,
};

function NavLink({
  text, route, count, disabled, isOffCanvas, handleLogout,
}) {
  return (
    <Li
      isOffCanvas={isOffCanvas}
      disabled={disabled}
      title={disabled ? 'On Vacation!' : ''}
    >
      {text === 'logout' ? (
        <LinkButton onClick={handleLogout}>
          <Text>{text}</Text>
        </LinkButton>
      ) : (
        <Link plainLink disabled={disabled} to={route}>
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
