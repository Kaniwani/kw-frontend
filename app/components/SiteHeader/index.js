import React from 'react';
import debounce from 'lodash/debounce';
import { clearToken } from 'utils/auth';
import { breakpoints } from 'shared/styles/media';

import LogoLink from 'components/LogoLink';

import OnCanvasMenu from './OnCanvasMenu';
import OffCanvasToggle from './OffCanvasToggle';
import OffCanvasMenu from './OffCanvasMenu';
import { Header, Nav } from './styles';

// FIXME: selectors for counts
// the rest can probably just be local state, since we have a nav of specific routes only.
const routes = [
  // {
  //   text: 'lessons',
  //   to: '/lessons',
  //   count: 0,
  //   isDisabled: false,
  // },
  {
    text: 'reviews',
    to: '/reviews',
    count: 0,
    isDisabled: false,
  },
  {
    text: 'vocabulary',
    to: '/vocabulary',
  },
  {
    text: 'settings',
    to: '/settings',
  },
  {
    text: 'about',
    to: '/about',
  },
  {
    text: 'contact',
    to: '/contact',
  },
  {
    text: 'logout',
    to: '/logout',
  },
];

class SiteHeader extends React.Component {
  state = {
    headerHeight: 70, // ballpark fallback
    offCanvasMenuActive: false,
    offCanvasToggleVisible: false,
    onCanvasWidth: null,
    linkWidths: null,
    routes,
  };

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('click', this.hideOffCanvasMenu);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('click', this.hideOffCanvasMenu);
  }

  handleResize = debounce(() => {
    this.setState(() => ({
      headerHeight: this.HeaderRef.clientHeight,
      offCanvasToggleVisible: window.innerWidth <= breakpoints.md,
    }));
  }, 150);

  hideOffCanvasMenu = () => {
    if (this.state.offCanvasMenuActive === true) {
      this.setState({ offCanvasMenuActive: false });
    }
  }

  handleToggle = (event) => {
    event.stopPropagation();
    this.setState((prevState) => ({
      offCanvasMenuActive: !prevState.offCanvasMenuActive,
    }));
  }

  handleLogout = () => {
    clearToken();
    this.props.history.push('/logout'); // eslint-disable-line react/prop-types
  }

  render() {
    let onCanvasRoutes = this.state.routes;
    let offCanvasRoutes = [];

    if (this.state.offCanvasToggleVisible) {
      onCanvasRoutes = this.state.routes.slice(0, 2);
      offCanvasRoutes = this.state.routes.slice(2);
    }

    return (
      <Header innerRef={(node) => { this.HeaderRef = node; }}>
        <Nav>
          <LogoLink />
          <OnCanvasMenu
            routes={onCanvasRoutes}
            handleLogout={this.handleLogout}
          />
          <OffCanvasToggle
            isVisible={this.state.offCanvasToggleVisible}
            isActive={this.state.offCanvasMenuActive}
            handleToggle={this.handleToggle}
            ariaControls="offCanvasMenu"
          />
          <OffCanvasMenu
            id="offCanvasMenu"
            routes={offCanvasRoutes}
            offsetTop={this.state.headerHeight}
            isVisible={this.state.offCanvasMenuActive}
            handleLogout={this.handleLogout}
          />
        </Nav>
      </Header>
    );
  }
}

export default SiteHeader;
