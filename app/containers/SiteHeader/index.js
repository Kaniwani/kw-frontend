import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
    reviewCount: PropTypes.number,
  };

  static defaultProps = {
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
    const isWideViewport = !this.state.offCanvasToggleVisible;
    let onCanvasRoutes = [
      // { text: 'lessons', count: this.props.lessonCount },
      { text: 'reviews', count: this.props.reviewCount },
      { text: 'vocabulary' },
    ];

    let offCanvasRoutes = [
      { text: 'settings' },
      { text: 'about' },
      { text: 'contact' },
      { text: 'logout' },
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

const mapStateToProps = createStructuredSelector({
  reviewCount: selectReviewCount,
});

export default connect(mapStateToProps)(SiteHeader);
