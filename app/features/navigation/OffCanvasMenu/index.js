import React from "react";
import PropTypes from "prop-types";
import cuid from "cuid";

import NavLink from "features/navigation/NavLink";

import { Wrapper, Ul, CloseButton } from "./styles";

OffCanvasMenu.propTypes = {
  links: PropTypes.array,
  isVisible: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

OffCanvasMenu.defaultProps = {
  links: [],
  isVisible: false,
};

function OffCanvasMenu({
  links, isVisible, onClose,
}) {
  return (
    <Wrapper isVisible={isVisible}>
      <CloseButton onClick={onClose} name="CLOSE" title="Close menu" size="3rem" />
      <Ul>
        <NavLink key={cuid()} isOffCanvas name="home" route="/" />
        {links.map((link) => (
          <NavLink key={cuid()} isOffCanvas {...link} />
        ))}
      </Ul>
    </Wrapper>
  );
}

export default OffCanvasMenu;
