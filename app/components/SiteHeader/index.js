import React from "react";
import PropTypes from "prop-types";

import cuid from 'cuid';

import Hamburger from 'components/Hamburger';
import LogoLink from "components/LogoLink";
import NavLink from 'components/NavLink';

import { Header, Nav, Ul } from "./styles";

const Menu = ({ links, onLogout }) => (
  <Ul>
    {links.map((link) => (
      <NavLink
        key={cuid()}
        handleLogout={onLogout}
        isOffCanvas={false}
        {...link}
      />
    ))}
  </Ul>
);
Menu.propTypes = {
  links: PropTypes.array.isRequired,
  onLogout: PropTypes.func.isRequired,
};

SiteHeader.propTypes = {
  lessonsCount: PropTypes.number,
  reviewsCount: PropTypes.number,
  isOnVacation: PropTypes.bool,
  isCompact: PropTypes.bool, // only show few links
  onLogout: PropTypes.func.isRequired,
  onHamburgerToggle: PropTypes.func.isRequired,
};

SiteHeader.defaultProps = {
  lessonsCount: 0,
  reviewsCount: 0,
  isOnVacation: false,
  isCompact: false,
};

function SiteHeader({
  lessonsCount,
  reviewsCount,
  isOnVacation,
  isCompact,
  onLogout,
  onHamburgerToggle,
}) {
  const sessionRoutes = [
    {
      text: "lessons",
      route: "/lessons",
      count: isOnVacation ? 0 : lessonsCount,
      disabled: isOnVacation,
    },
    {
      text: "reviews",
      route: "/reviews",
      count: isOnVacation ? 0 : reviewsCount,
      disabled: isOnVacation,
    },
  ];
  const additionalRoutes = [
    { text: "vocabulary", route: "/vocabulary/levels" },
    { text: "settings", route: "/settings" },
    { text: "about", route: "/about" },
    { text: "contact", route: "/contact" },
    { text: "logout", route: "/logout" },
  ];
  return (
    <Header>
      <Nav>
        <LogoLink size={isCompact ? '3.5rem' : '4.5rem'} />
        <Menu links={sessionRoutes} />
        {!isCompact && <Menu links={additionalRoutes} onLogout={onLogout} />}
        {isCompact && <Hamburger onToggle={onHamburgerToggle} />}
      </Nav>
    </Header>
  );
}

export default SiteHeader;
