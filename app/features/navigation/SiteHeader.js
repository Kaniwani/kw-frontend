import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { debounce, isEqual } from 'lodash';
import cuid from 'cuid';

import { breakpoints } from 'common/styles/media';
import { selectLocationPath } from 'common/selectors';

import Element from 'common/components/Element';
import LogoLink from 'common/components/LogoLink';
import Hamburger from './Hamburger';
import OffCanvasMenu from './OffCanvasMenu';

import { Header, Nav, NavLinks } from './styles';
import NavLink from './NavLink';

const PRIMARY_LINKS = [
  {
    name: 'lessons',
    route: '/lessons',
    hasCount: true,
  },
  {
    name: 'reviews',
    route: '/reviews',
    hasCount: true,
  },
];
const SECONDARY_LINKS = [
  { name: 'vocabulary', route: '/vocabulary' },
  { name: 'settings', route: '/settings' },
  { name: 'about', route: '/about' },
  { name: 'contact', route: '/contact' },
  { name: 'logout', route: '/logout' },
];

export class SiteHeader extends React.Component {
  static propTypes = {
    locationPath: PropTypes.string.isRequired,
  };

  state = {
    offCanvasMenuActive: false,
  };

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const unchanged = isEqual(this.props, nextProps) && isEqual(this.state, nextState);
    return !unchanged;
  }

  componentDidUpdate(prevProps) {
    if (this.props.locationPath !== prevProps.locationPath) {
      this.hideOffCanvasMenu();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    this.hideOffCanvasMenu();
  }

  handleResize = debounce(() => {
    this.hideOffCanvasMenu();
    this.setState(() => ({
      isWideViewport: window.innerWidth > breakpoints.md,
    }));
  }, 150);

  hideOffCanvasMenu = () => {
    this.setState({ offCanvasMenuActive: false });
    document.body.classList.remove('offCanvasMenu--isOpen');
  };

  showOffCanvasMenu = () => {
    this.setState({ offCanvasMenuActive: true });
    document.body.classList.add('offCanvasMenu--isOpen');
  };

  renderMenu = (links) => (
    <NavLinks>
      {links.map((link) => <NavLink key={cuid()} isOffCanvas={false} {...link} />)}
    </NavLinks>
  );

  render() {
    const { isWideViewport, offCanvasMenuActive } = this.state;
    const logoSize = isWideViewport ? '4.25rem' : '3.25rem';

    return isWideViewport === undefined ? null : (
      <Header
        innerRef={(node) => {
          this.HeaderRef = node;
        }}
      >
        <Nav>
          <LogoLink size={logoSize} />
          <Element flexRow flex="999 1 auto" justifyContent="space-between">
            {this.renderMenu(PRIMARY_LINKS)}
            {isWideViewport && this.renderMenu(SECONDARY_LINKS)}
          </Element>
          {!isWideViewport && <Hamburger onToggle={this.showOffCanvasMenu} />}
        </Nav>
        <OffCanvasMenu
          links={SECONDARY_LINKS}
          isVisible={offCanvasMenuActive}
          onClose={this.hideOffCanvasMenu}
        />
      </Header>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  locationPath: selectLocationPath,
});

export default connect(mapStateToProps)(SiteHeader);
