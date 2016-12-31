import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import List from 'components/List';
import { Nav, Li, NavLink, Text, Count } from './styles';
import { addReviewCount } from 'containers/SiteHeader/utils';

function DesktopNav({ links, reviewCount, ...props }) {
  return (
    <Nav>
      <List items={addReviewCount(links, reviewCount)} component={NavItem} componentProps={props} />
    </Nav>
  );
}

DesktopNav.propTypes = {
  links: PropTypes.instanceOf(Immutable.Iterable),
  reviewCount: PropTypes.number,
};

function NavItem({ item }) {
  return (
    <Li>
      <NavLink href={item.get('href')} to={item.get('to')} disabled={item.get('isDisabled')} activeClassName="is-active" plainLink>
        <Text className="NavLink__Text">
          {item.get('text')}
          {item.get('count') && <Count>{item.get('count')}</Count>}
        </Text>
      </NavLink>
    </Li>
  );
}

NavItem.propTypes = {
  item: PropTypes.oneOfType([
    PropTypes.instanceOf(Immutable.Iterable),
    PropTypes.object,
  ]),
};

export default DesktopNav;
