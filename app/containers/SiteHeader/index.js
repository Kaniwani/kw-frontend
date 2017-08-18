import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import { breakpoints } from 'shared/styles/media';

import LogoLink from 'components/LogoLink';
import { selectSessionCount, selectLocationPath } from 'containers/App/selectors';
import app from 'containers/App/actions';

import OnCanvasMenu from './OnCanvasMenu';
import OffCanvasToggle from './OffCanvasToggle';
import OffCanvasMenu from './OffCanvasMenu';
import { Header, Nav } from './styles';

class SiteHeader extends React.Component {
  static propTypes = {
    lessonsCount: PropTypes.number.isRequired,
    reviewsCount: PropTypes.number.isRequired,
    locationPath: PropTypes.string.isRequired,
    logoutUser: PropTypes.func.isRequired,
  };

  state = {
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

  componentDidUpdate(prevProps) {
    if (this.props.locationPath !== prevProps.locationPath) {
      setTimeout(this.hideOffCanvasMenu, 300);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = debounce(() => {
    this.hideOffCanvasMenu();
    this.setState(() => ({
      offCanvasToggleVisible: window.innerWidth <= breakpoints.md,
    }));
  }, 150);

  hideOffCanvasMenu = () => {
    this.setState({ offCanvasMenuActive: false });
    document.body.classList.remove('offCanvasMenu--isOpen');
  }

  showOffCanvasMenu = () => {
    this.setState({ offCanvasMenuActive: true });
    document.body.classList.add('offCanvasMenu--isOpen');
  }

  render() {
    const isWideViewport = !this.state.offCanvasToggleVisible;
    let onCanvasRoutes = [
      { text: 'lessons', route: '/lessons', count: this.props.lessonsCount },
      { text: 'reviews', route: '/reviews', count: this.props.reviewsCount },
    ];

    let offCanvasRoutes = [
      { text: 'vocabulary', route: '/vocabulary/levels' },
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
            handleLogout={this.props.logoutUser}
          />
          <OffCanvasToggle
            isVisible={this.state.offCanvasToggleVisible}
            handleToggle={this.showOffCanvasMenu}
          />
          <OffCanvasMenu
            links={offCanvasRoutes}
            isVisible={this.state.offCanvasMenuActive}
            handleLogout={this.props.logoutUser}
            handleClose={this.hideOffCanvasMenu}
          />
        </Nav>
      </Header>
    );
  }
}

const mapStateToProps = (state) => ({
  reviewsCount: selectSessionCount(state, { category: 'reviews' }),
  lessonsCount: selectSessionCount(state, { category: 'lessons' }),
  locationPath: selectLocationPath(state),
});

const mapDispatchToProps = ({
  logoutUser: app.user.logout,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SiteHeader));
