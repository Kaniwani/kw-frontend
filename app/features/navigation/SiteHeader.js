import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { debounce } from 'lodash';
import cuid from 'cuid';
import { Switch, Route } from 'react-router-dom';
import { hasToken } from 'common/utils/auth';

import { breakpoints } from 'common/styles/media';
import { selectLocationPath } from 'common/selectors';

import Aux from 'common/components/Aux';
import Element from 'common/components/Element';
import QuizSummaryHeader from 'features/quiz/QuizSummary/QuizSummaryHeader';
import LogoLink from 'common/components/LogoLink';
import Hamburger from './Hamburger';
import OffCanvasMenu from './OffCanvasMenu';

import { Header, Nav, NavLinks } from './styles';
import NavLink from './NavLink';

const ConnectedSwitch = connect((state) => ({ location: state.router.location }))(Switch);

import { SESSION_CATEGORIES } from 'features/quiz/QuizSession/constants';

const PRIMARY_LINKS = Object.values(SESSION_CATEGORIES).map((category) => ({
  route: `/${category}`,
  name: category,
  hasCount: true,
}));

const SECONDARY_LINKS = [
  { name: 'vocabulary', route: '/vocabulary' },
  { name: 'settings', route: '/settings' },
  { name: 'about', route: '/about' },
  { name: 'contact', route: '/contact' },
  { name: 'logout', route: '/logout' },
];

const Menu = ({ links }) => (
  <NavLinks>{links.map((link) => <NavLink key={cuid()} isOffCanvas={false} {...link} />)}</NavLinks>
);

SiteHeader.propTypes = {
  expanded: PropTypes.bool.isRequired,
  showOffCanvasMenu: PropTypes.bool.isRequired,
  onHamburgerToggle: PropTypes.func.isRequired,
  onMenuClose: PropTypes.func.isRequired,
};

export function SiteHeader({ expanded, showOffCanvasMenu, onHamburgerToggle, onMenuClose }) {
  return (
    <Header>
      <ConnectedSwitch>
        <Route exact path="/:category(lessons|reviews)/session" />
        <Route exact path="/maintenance" />
        <Route exact path="/welcome" />
        <Route
          render={() => (
            <Aux>
              <Nav>
                <LogoLink />
                <Switch>
                  <Route path="/:category(lessons|reviews)" component={QuizSummaryHeader} />
                  <Route
                    render={() => (
                      <Aux>
                        <Element flexRow flex="999 1 auto" justifyContent="space-between">
                          <Menu links={PRIMARY_LINKS} />
                          {expanded && <Menu links={SECONDARY_LINKS} />}
                        </Element>
                        {!expanded && <Hamburger onToggle={onHamburgerToggle} />}
                      </Aux>
                    )}
                  />
                </Switch>
              </Nav>
              <OffCanvasMenu
                links={SECONDARY_LINKS}
                isVisible={showOffCanvasMenu}
                onClose={onMenuClose}
              />
            </Aux>
          )}
        />
      </ConnectedSwitch>
    </Header>
  );
}

export class SiteHeaderContainer extends React.Component {
  static propTypes = {
    locationPath: PropTypes.string.isRequired,
  };

  state = {
    offCanvasMenuActive: false,
    isWideViewport: null,
  };

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
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
    this.setState({
      isWideViewport: window.innerWidth > breakpoints.md,
    });
  }, 150);

  hideOffCanvasMenu = () => {
    this.setState({ offCanvasMenuActive: false });
    document.body.classList.remove('offCanvasMenu--isOpen');
  };

  showOffCanvasMenu = () => {
    this.setState({ offCanvasMenuActive: true });
    document.body.classList.add('offCanvasMenu--isOpen');
  };

  render() {
    const viewportMeasured = this.state.isWideViewport != null;
    return (
      viewportMeasured &&
      hasToken() && (
        <SiteHeader
          expanded={this.state.isWideViewport}
          showOffCanvasMenu={this.state.offCanvasMenuActive}
          onHamburgerToggle={this.showOffCanvasMenu}
          onMenuClose={this.hideOffCanvasMenu}
        />
      )
    );
  }
}

const mapStateToProps = createStructuredSelector({
  locationPath: selectLocationPath,
});

export default connect(mapStateToProps)(SiteHeaderContainer);
