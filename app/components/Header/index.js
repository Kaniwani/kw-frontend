import React from 'react';
import styled from 'styled-components';

import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Logo from 'shared/assets/img/logo.png';

const LogoLink = styled.a`
  display: block;
  width: 200px;
  margin-left: auto;
  margin-right: auto;
`;

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <header>
        <LogoLink href="https://kaniwani.com">
          <Img src={Logo} alt="kaniwani - Logo" />
        </LogoLink>
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

export default Header;
