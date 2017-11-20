import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, pure } from 'recompose';

import app from 'shared/actions';

import NavLink from 'components/NavLink';
import Element from 'base/Element';
import crabigatorOutline from 'shared/assets/img/crabigator-outline.svg';
import { Footer, CrabigatorStencil, Links } from './styles';

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

const enhance = compose(
  connect(null, mapDispatchToProps),
  pure,
);

export default enhance(SiteFooter);
