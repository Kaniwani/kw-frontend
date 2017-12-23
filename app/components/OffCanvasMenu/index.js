import React from "react";
import PropTypes from "prop-types";
import cuid from "cuid";

import NavLink from "components/NavLink";

import { Wrapper, Ul, CloseButton } from "./styles";

OffCanvasMenu.propTypes = {
  links: PropTypes.array,
  isVisible: PropTypes.bool,
  onLogout: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

OffCanvasMenu.defaultProps = {
  links: [],
  isVisible: false,
};

function OffCanvasMenu({
  links, isVisible, onLogout, onClose,
}) {
  return (
    <Wrapper isVisible={isVisible}>
      <CloseButton onClick={onClose} name="CLOSE" title="Close menu" size="3rem" />
      {/* FIXME: avoid passing handleLogout to every navlink... map and cloneelement if logout route instead */}
      <Ul>
        {links.map((link) => (
          <NavLink key={cuid()} handleLogout={onLogout} isOffCanvas {...link} />
        ))}
      </Ul>
    </Wrapper>
  );
}

export default OffCanvasMenu;
