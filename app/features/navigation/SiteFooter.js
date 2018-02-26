import React from 'react';
import { Switch, Route } from 'react-router-dom';
import cuid from 'cuid';

import { hasToken } from 'common/utils/auth';
import Element from 'common/components/Element';
import NavLink from './NavLink';

import crabigatorOutline from 'common/assets/img/crabigator-outline.svg';
import { Footer, CrabigatorStencil, FooterLinks, FooterLinkGroup } from './styles';

const links = [
  [{ route: '/lessons', name: 'lessons' }, { route: '/reviews', name: 'reviews' }],
  [
    { route: '/vocabulary', name: 'vocabulary' },
    { route: '/settings', name: 'settings' },
    { route: '/logout', name: 'logout' },
  ],
  [{ route: '/about', name: 'about' }, { route: '/contact', name: 'contact' }],
];

export function SiteFooter() {
  return (
    <Footer>
      <Element style={{ position: 'relative' }} flexRow justifyContent="flex-end">
        <FooterLinks flexRow flexWrap flexCenter>
          {links.map((group) => (
            <FooterLinkGroup key={cuid()}>
              {group.map((link) => <NavLink key={cuid()} isOffCanvas={false} {...link} />)}
            </FooterLinkGroup>
          ))}
        </FooterLinks>
        <CrabigatorStencil imgSrc={crabigatorOutline} bgPosition="bottom left" bgSize="contain" />
      </Element>
    </Footer>
  );
}

export function SiteFooterContainer() {
  return (
    hasToken() && (
      <Switch>
        <Route exact path="/" render={SiteFooter} />
        <Route exact path="/:category(reviews|lessons)" render={SiteFooter} />
        <Route exact path="/(vocabulary|settings|about|contact)" render={SiteFooter} />
        <Route exact path="/vocabulary/levels/:level?" render={SiteFooter} />
        <Route exact path="/vocabulary/entry/:id?" render={SiteFooter} />
      </Switch>
    )
  );
}

export default SiteFooterContainer;
