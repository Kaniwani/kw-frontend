import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, pure } from 'recompose';

import app from 'shared/actions';

import NavLink from 'components/NavLink';
import Element from 'base/Element';

import crabigatorOutline from 'shared/assets/img/crabigator-outline.svg';
import { Footer, CrabigatorStencil, Links, LinkGroup } from './styles';

SiteFooter.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

function SiteFooter({ logoutUser }) {
  return (
    <Footer>
      <Element style={{ position: 'relative' }} flexRow justifyContent="flex-end">
        <Links flexRow flexWrap flexCenter>
          <LinkGroup plainList>
            <NavLink route="/lessons" text="lessons" />
            <NavLink route="/reviews" text="reviews" />
          </LinkGroup>
          <LinkGroup plainList>
            <NavLink route="/vocabulary" text="vocabulary" />
            <NavLink route="/settings" text="settings" />
            <NavLink route="/logout" text="logout" handleLogout={logoutUser} />
          </LinkGroup>
          <LinkGroup plainList>
            <NavLink route="/about" text="about" />
            <NavLink route="/contact" text="contact" />
          </LinkGroup>
        </Links>
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
  logoutUser: app.user.logout,
};

const enhance = compose(connect(null, mapDispatchToProps), pure);

export default enhance(SiteFooter);
