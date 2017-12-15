import React from "react";
import PropTypes from "prop-types";
import { StyledDivider } from "./styles";

Divider.propTypes = {
  fade: PropTypes.bool,
  fullWidth: PropTypes.bool,
  color: PropTypes.string,
};

Divider.defaultProps = {
  fade: false,
  fullWidth: false,
  color: "grey",
};

function Divider(props) {
  return <StyledDivider {...props} />;
}

export default Divider;
