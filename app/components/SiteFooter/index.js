import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import app from 'containers/App/actions';

import NavLink from 'components/NavLink';
import Container from 'base/Container';
import Element from 'base/Element';
import BackgroundImg from 'components/BackgroundImg';
import crabigatorOutline from 'shared/assets/img/crabigator-outline.svg';
import { Footer } from './styles';

const CrabigatorStencil = BackgroundImg.extend`
  z-index: 1;
  opacity: .5;
  max-height: 95%;
`;

const Links = styled(Container)`
  z-index: 2;
  margin-right: 50px;
`;

SiteFooter.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

function SiteFooter({ logoutUser }) {
  return (
    <Footer>
      <Element style={{ position: 'relative' }} flexRow justifyContent="flex-end">
        <Links flexRow flexWrap flexCenter>
          <Element flexColumn>
            <NavLink route="/lessons" text="lessons" />
            <NavLink route="/reviews" text="reviews" />
          </Element>
          <Element flexColumn>
            <NavLink route="/vocabulary" text="vocabulary" />
            <NavLink route="/settings" text="settings" />
            <NavLink route="/logout" text="logout" handleLogout={logoutUser} />
          </Element>
          <Element flexColumn>
            <NavLink route="/about" text="about" />
            <NavLink route="/contact" text="contact" />
          </Element>
        </Links>
        <CrabigatorStencil imgSrc={crabigatorOutline} bgPosition="bottom left" bgSize="contain" />
      </Element>
    </Footer>
  );
}

const mapDispatchToProps = ({
  logoutUser: app.user.logout,
});

export default connect(null, mapDispatchToProps)(SiteFooter);
