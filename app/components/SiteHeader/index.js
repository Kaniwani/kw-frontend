import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

import { breakpoints } from 'shared/styles/media';

import LogoLink from 'components/LogoLink';

import OnCanvasMenu from './OnCanvasMenu';
import OffCanvasToggle from './OffCanvasToggle';
import OffCanvasMenu from './OffCanvasMenu';
import { Header, Nav } from './styles';

// FIXME: selectors for counts
// the rest can probably just be local state, since we have a nav of specific routes only.
const devRoutes = [
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

class SiteHeader extends React.PureComponent {
  static propTypes = {
    routes: PropTypes.array.isRequired,
  }

  static defaultProps = {
    routes: devRoutes,
  }

  state = {
    headerHeight: 70, // ballpark fallback
    offCanvasMenuActive: false,
    offCanvasToggleVisible: false,
    onCanvasWidth: null,
    linkWidths: null,
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

  handleToggleClick = (event) => {
    event.stopPropagation();
    this.setState(prevState => ({
      offCanvasMenuActive: !prevState.offCanvasMenuActive,
    }));
  }

  render() {
    let onCanvasRoutes = this.props.routes;
    let offCanvasRoutes = [];

    if (this.state.offCanvasToggleVisible) {
      onCanvasRoutes = this.props.routes.slice(0, 2);
      offCanvasRoutes = this.props.routes.slice(2);
    }

    return (
      <Header innerRef={(node) => { this.HeaderRef = node; }}>
        <Nav>
          <LogoLink />
          <OnCanvasMenu routes={onCanvasRoutes} />
          {this.state.offCanvasToggleVisible && (
            <OffCanvasToggle
              ariaControls="offCanvasMenu"
              isActive={this.state.offCanvasMenuActive}
              handleToggle={this.handleToggleClick}
            />
          )}
          <OffCanvasMenu
            id="offCanvasMenu"
            routes={offCanvasRoutes}
            offsetTop={this.state.headerHeight}
            isVisible={this.state.offCanvasMenuActive}
          />
        </Nav>
      </Header>
    );
  }
}

export default SiteHeader;
