import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { user } from 'features/user/actions';

import { Li, LinkButton, Text } from "./styles";

export const LogoutLink = ({ name, isOffCanvas, disabled, onLogout }) => {
  return (
    <Li isOffCanvas={isOffCanvas} disabled={disabled}>
      <LinkButton onClick={onLogout}>
        <Text>{name}</Text>
      </LinkButton>
    </Li>
  );
};

const mapDispatchToProps = {
  onLogout: user.logout,
};

export default connect(null, mapDispatchToProps)(LogoutLink);
