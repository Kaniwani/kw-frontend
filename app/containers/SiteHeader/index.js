import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { debounce, isEqual } from 'lodash';
import { breakpoints } from 'shared/styles/media';

import LogoLink from 'components/LogoLink';
import { selectSessionCount, selectLocationPath, selectVacationDate } from 'containers/App/selectors';
import app from 'containers/App/actions';

import OnCanvasMenu from './OnCanvasMenu';
import OffCanvasToggle from './OffCanvasToggle';
import OffCanvasMenu from './OffCanvasMenu';
import { Header, Nav } from './styles';

class SiteHeader extends React.Component {
  static propTypes = {
    lessonsCount: PropTypes.number.isRequired,
    reviewsCount: PropTypes.number.isRequired,
    logoutUser: PropTypes.func.isRequired,
    onVacation: PropTypes.bool.isRequired,
    locationPath: PropTypes.string,
  };

  state = {
    offCanvasMenuActive: false,
    additionalRoutes: [
      { text: 'vocabulary', route: '/vocabulary/levels' },
      { text: 'settings', route: '/settings' },
      { text: 'about', route: '/about' },
      { text: 'contact', route: '/contact' },
      { text: 'logout', route: '/logout' },
    ],
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
      isWideViewport: window.innerWidth > breakpoints.md,
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
    const { lessonsCount, reviewsCount, onVacation } = this.props;
    const sessionRoutes = [
      { text: 'lessons', route: '/lessons', count: onVacation ? 0 : lessonsCount, disabled: onVacation },
      { text: 'reviews', route: '/reviews', count: onVacation ? 0 : reviewsCount, disabled: onVacation },
    ];
    return (
      <Header innerRef={(node) => { this.HeaderRef = node; }}>
        <Nav>
          <LogoLink />
          <div style={{ margin: '0 auto 0 .5rem' }}><OnCanvasMenu links={sessionRoutes} /></div>
          {this.state.isWideViewport && <OnCanvasMenu links={this.state.additionalRoutes} handleLogout={this.props.logoutUser} />}
          <OffCanvasToggle isVisible={!this.state.isWideViewport} handleToggle={this.showOffCanvasMenu} />
          <OffCanvasMenu
            links={this.state.additionalRoutes}
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
  onVacation: !!selectVacationDate(state),
});

const mapDispatchToProps = ({
  logoutUser: app.user.logout,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SiteHeader));
