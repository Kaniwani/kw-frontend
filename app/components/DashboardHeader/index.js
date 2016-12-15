import React from 'react';

import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import LogoLink from 'components/LogoLink';

class DashboardHeader extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <header>
        <LogoLink urlPath="/" size="100px" />
        <NavBar>
          <HeaderLink to="/">
            Home
          </HeaderLink>
          <HeaderLink to="/review">
            Review
          </HeaderLink>
        </NavBar>
      </header>
    );
  }
}

export default DashboardHeader;
