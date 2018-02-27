import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import user from 'features/user/actions';

import { Li, LinkButton, Text } from './styles';

export const LogoutLink = ({ name, isOffCanvas, onLogout }) => (
  <Li isOffCanvas={isOffCanvas}>
    <LinkButton onClick={onLogout}>
      <Text>{name}</Text>
    </LinkButton>
  </Li>
);

LogoutLink.propTypes = {
  name: PropTypes.string.isRequired,
  isOffCanvas: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  onLogout: user.logout,
};

export default connect(null, mapDispatchToProps)(LogoutLink);
