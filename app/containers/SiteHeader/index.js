import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import { clearToken } from 'utils/auth';
import { breakpoints } from 'shared/styles/media';

import LogoLink from 'components/LogoLink';
import { selectRemainingCount } from 'containers/App/selectors';

import OnCanvasMenu from './OnCanvasMenu';
import OffCanvasToggle from './OffCanvasToggle';
import OffCanvasMenu from './OffCanvasMenu';
import { Header, Nav } from './styles';

class SiteHeader extends React.Component {
  static propTypes = {
    lessonsCount: PropTypes.number.isRequired,
    reviewsCount: PropTypes.number.isRequired,
  };

  state = {
    headerHeight: 70, // ballpark fallback
    // FIXME: NOPE! UI redux state instead
    offCanvasMenuActive: false,
    offCanvasToggleVisible: false,
  };

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  // FIXME: navlinks don't have active state? probably need a ConnectedSwitch
  shouldComponentUpdate(nextProps, nextState) {
    const unchanged = isEqual(this.props, nextProps) && isEqual(this.state, nextState);
    return !unchanged;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
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
    // FIXME: nope nope nope, ui state, dispatch action!
    // also dispatch hiding of menu on navlink click
    this.setState((prevState) => ({
      offCanvasMenuActive: !prevState.offCanvasMenuActive,
    }));
  }

  handleLogout = () => {
    clearToken();
    this.props.history.push('/welcome'); // eslint-disable-line react/prop-types
  }

  render() {
    const isWideViewport = !this.state.offCanvasToggleVisible;
    let onCanvasRoutes = [
      { text: 'lessons', route: '/lessons', count: this.props.lessonsCount },
      { text: 'reviews', route: '/reviews', count: this.props.reviewsCount },
      { text: 'vocabulary', route: '/vocabulary/levels' },
    ];

    let offCanvasRoutes = [
      { text: 'settings', route: '/settings' },
      { text: 'about', route: '/about' },
      { text: 'contact', route: '/contact' },
      { text: 'logout', route: '/logout' },
    ];

    // show all routes in main menu if large screen
    if (isWideViewport) {
      onCanvasRoutes = onCanvasRoutes.concat(offCanvasRoutes);
      offCanvasRoutes = [];
    }

    return (
      <Header innerRef={(node) => { this.HeaderRef = node; }}>
        <Nav>
          <LogoLink />
          <OnCanvasMenu
            links={onCanvasRoutes}
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
            links={offCanvasRoutes}
            offsetTop={this.state.headerHeight}
            isVisible={this.state.offCanvasMenuActive}
            handleLogout={this.handleLogout}
          />
        </Nav>
      </Header>
    );
  }
}

const mapStateToProps = (state) => ({
  reviewsCount: selectRemainingCount(state, { category: 'reviews' }),
  lessonsCount: selectRemainingCount(state, { category: 'lessons' }),
});

export default withRouter(connect(mapStateToProps)(SiteHeader));
