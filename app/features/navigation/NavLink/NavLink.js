import React from "react";
import PropTypes from "prop-types";

import { Li, Link, Text } from "./styles";

NavLink.propTypes = {
  name: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  isOffCanvas: PropTypes.bool,
  disabled: PropTypes.bool,
};

NavLink.defaultProps = {
  isOffCanvas: false,
  disabled: false,
};

export function NavLink({ name, route, disabled, isOffCanvas }) {
  return (
    <Li
      isOffCanvas={isOffCanvas}
      disabled={disabled}
      title={disabled ? "On Vacation!" : ""}
    >
      <Link disabled={disabled} to={route} tabIndex={disabled ? -1 : 0}>
        <Text>
          <div>{name}</div>
        </Text>
      </Link>
    </Li>
  );
}

export default NavLink;
