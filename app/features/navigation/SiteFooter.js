import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Element from "common/components/Element";
import NavLink from "./NavLink/NavLink";
import CountLink from "./NavLink/CountLink";
import LogoutLink from "./NavLink/LogoutLink";

import { user } from "features/user/actions";

import crabigatorOutline from "common/assets/img/crabigator-outline.svg";
import { Footer, CrabigatorStencil, FooterLinks, FooterLinkGroup } from "./styles";

SiteFooter.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export function SiteFooter({ onLogout }) {
  return (
    <Footer>
      <Element style={{ position: "relative" }} flexRow justifyContent="flex-end">
        <FooterLinks flexRow flexWrap flexCenter>
          <FooterLinkGroup plainList>
            <NavLink route="/lessons" name="lessons" />
            <NavLink route="/reviews" name="reviews" />
          </FooterLinkGroup>
          <FooterLinkGroup plainList>
            <NavLink route="/vocabulary" name="vocabulary" />
            <NavLink route="/settings" name="settings" />
            <LogoutLink route="/logout" name="logout" onLogout={onLogout} />
          </FooterLinkGroup>
          <FooterLinkGroup plainList>
            <NavLink route="/about" name="about" />
            <NavLink route="/contact" name="contact" />
          </FooterLinkGroup>
        </FooterLinks>
        <CrabigatorStencil
          imgSrc={crabigatorOutline}
          bgPosition="bottom left"
          bgSize="contain"
        />
      </Element>
    </Footer>
  );
}

const mapDispatchToProps = {
  onLogout: user.logout,
};

export default connect(null, mapDispatchToProps)(SiteFooter);
