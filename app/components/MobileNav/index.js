import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import { addReviewCount } from 'containers/SiteHeader/utils';
import { Nav, Li, MobileNavLink, Text, Count, OffCanvasMenu } from './styles';

import List from 'components/List';
import NavToggle from './NavToggle';

function MobileNav({ links, reviewCount, visible, handleToggleClick, offsetTop, ...props }) {
  const reviewLinkOnly = addReviewCount(links.slice(0, 1), reviewCount);
  const offCanvasLinks = links.slice(1);
  return (
    <Nav>
      <List items={reviewLinkOnly} component={NavItem} componentProps={props} />
      <OffCanvasMenu
        offsetTop={offsetTop}
        className={visible ? 'is-visible' : ''}
        items={offCanvasLinks}
        component={NavItem}
        componentProps={props}
      />
      <NavToggle active={visible} handleClick={handleToggleClick} />
    </Nav>
  );
}

MobileNav.propTypes = {
  links: PropTypes.instanceOf(Immutable.Iterable).isRequired,
  visible: PropTypes.bool.isRequired,
  offsetTop: PropTypes.number.isRequired,
  reviewCount: PropTypes.number.isRequired,
  handleToggleClick: PropTypes.func.isRequired,
};

function NavItem({ item }) {
  return (
    <Li>
      <MobileNavLink
        href={item.get('href')}
        to={item.get('to')}
        disabled={item.get('isDisabled')}
        activeClassName="is-active"
        plainLink
      >
        <Text className="NavLink__Text">
          {item.get('text')}
          {(item.get('count') > 0) && <Count>{item.get('count')}</Count>}
        </Text>
      </MobileNavLink>
    </Li>
  );
}

NavItem.propTypes = {
  item: PropTypes.oneOfType([
    PropTypes.instanceOf(Immutable.Iterable),
    PropTypes.object,
  ]),
};

export default MobileNav;
