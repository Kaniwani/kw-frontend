import React from "react";
import PropTypes from "prop-types";

import Icon from "components/Icon";
import Button from "base/Button";

// FIXME: just use <Button plainButton><Icon /></Button> instead..... geez

IconButton.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.oneOf(["submit", "reset", "button"]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  inline: PropTypes.bool,
  children: PropTypes.node,
  plainButton: PropTypes.bool,
};

IconButton.defaultProps = {
  type: "button",
  plainButton: true,
  color: "currentColor",
  size: "1.5em",
  disabled: false,
  inline: false,
  children: null,
  onClick: (event) => event /* passthrough, for submit buttons in forms with onSubmit */,
};

function IconButton({
  name, title, color, size, inline, children, ...props
}) {
  return (
    <Button aria-label={title} {...props}>
      {children}
      <Icon name={name} inline={inline} size={size} color={color} />
    </Button>
  );
}

export default IconButton;
