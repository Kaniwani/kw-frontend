import React from "react";
import PropTypes from "prop-types";

import Icon from "common/components/Icon";
import { StyledButton } from "./styles";

ScrollTopButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isVisible: PropTypes.bool,
  isScrolling: PropTypes.bool,
};

ScrollTopButton.defaultProps = {
  isVisible: false,
  isScrolling: false,
};

export default function ScrollTopButton({
  onClick, isVisible, isScrolling, ...props
}) {
  return (
    <StyledButton
      type="button"
      onClick={onClick}
      isVisible={isVisible}
      isScrolling={isScrolling}
      {...props}
    >
      <Icon name="ARROW_UP" size="2.5rem" color="white" />
    </StyledButton>
  );
}
