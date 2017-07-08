import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import debounce from 'lodash/debounce';
import { clearToken } from 'utils/auth';
import { breakpoints } from 'shared/styles/media';

import LogoLink from 'components/LogoLink';
import { selectReviewCount } from 'containers/App/selectors';

import OnCanvasMenu from './OnCanvasMenu';
import OffCanvasToggle from './OffCanvasToggle';
import OffCanvasMenu from './OffCanvasMenu';
import { Header, Nav } from './styles';

class SiteHeader extends React.Component {
  static propTypes = {
    lessonCount: PropTypes.number,
    reviewCount: PropTypes.number,
  };

  static defaultProps = {
    lessonCount: 0,
    reviewCount: 0,
  };

  state = {
    headerHeight: 70, // ballpark fallback
    offCanvasMenuActive: false,
    offCanvasToggleVisible: false,
  };

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  // FIXME: navlinks don't have active state?
  shouldComponentUpdate({ reviewCount, lessonCount }) {
    console.log(reviewCount, this.props.reviewCount, lessonCount, this.props.lessonCount);
    if (
      reviewCount === this.props.reviewCount &&
      lessonCount === this.props.lessonCount
    ) {
      return false;
    }
    return true;
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
    this.setState((prevState) => ({
      offCanvasMenuActive: !prevState.offCanvasMenuActive,
    }));
  }

  handleLogout = () => {
    clearToken();
    this.props.history.push('/logout'); // eslint-disable-line react/prop-types
  }

  render() {
    const isWideViewport = !this.state.offCanvasToggleVisible;
    let onCanvasRoutes = [
      // { text: 'lessons', count: this.props.lessonCount },
      { text: 'reviews', route: '/reviews', count: this.props.reviewCount },
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

const mapStateToProps = createStructuredSelector({
  reviewCount: selectReviewCount,
});

export default withRouter(connect(mapStateToProps)(SiteHeader));
