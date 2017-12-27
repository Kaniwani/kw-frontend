import React from "react";

import NavLink from "./NavLink";
import CountLink from "./CountLink";
import LogoutLink from "./LogoutLink";

export default (props) => {
  if (props.hasCount) {
    return <CountLink {...props} />;
  }
  if (props.name === "logout") {
    return <LogoutLink {...props} />;
  }
  return <NavLink {...props} />;
};
