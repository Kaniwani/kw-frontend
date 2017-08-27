import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import app from 'containers/App/actions';
// FIXME: extract from SiteHeader to components
import NavLink from 'containers/SiteHeader/NavLink';

import { Footer } from './styles';

SiteFooter.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

function SiteFooter({ logoutUser }) {
  return (
    <Footer>
      <NavLink route="/lessons" text="lessons" />
      <NavLink route="/reviews" text="reviews" />
      <NavLink route="/vocabulary" text="vocabulary" />
      <NavLink route="/settings" text="settings" />
      <NavLink route="/about" text="about" />
      <NavLink route="/contact" text="contact" />
      <NavLink route="/faq" text="faq" />
      <NavLink route="/logout" text="logout" handleLogout={logoutUser} />
    </Footer>
  );
}

const mapDispatchToProps = ({
  logoutUser: app.user.logout,
});

export default connect(null, mapDispatchToProps)(SiteFooter);
