import React from "react";
import PropTypes from "prop-types";

import Icon from "common/components/Icon";
import { Link } from "./styles";

// color and size have defaults in <Icon /> already
/* eslint-disable react/require-default-props */
IconLink.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  href: PropTypes.string,
  to: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
/* eslint-enable */

IconLink.defaultProps = {
  href: "",
  to: "",
};

function IconLink({
  name, title, color, size, href, to, ...props
}) {
  return (
    <Link title={title} href={href} to={to} {...props}>
      <Icon inline={false} name={name} color={color} size={size} />
    </Link>
  );
}

export default IconLink;
