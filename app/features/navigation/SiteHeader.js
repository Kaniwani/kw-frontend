import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import cuid from 'cuid';
import { Switch, Route } from 'react-router-dom';
import { hasToken } from 'common/utils/auth';

import { selectLocationPath } from 'common/selectors';

import Element from 'common/components/Element';
import QuizSummaryHeader from 'features/quiz/QuizSummary/QuizSummaryHeader';
import LogoLink from 'common/components/LogoLink';
import Hamburger from './Hamburger';
import OffCanvasMenu from './OffCanvasMenu';

import { Header, Nav, NavLinks } from './styles';
import NavLink from './NavLink';

const MIN_VIEWPORT_SIZE = 700;

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
        <Route exact path="/welcome" />
        <Route
          render={() => (
            <Fragment>
              <Nav>
                <LogoLink />
                <Switch>
                  <Route path="/:category(lessons|reviews)" component={QuizSummaryHeader} />
                  <Route
                    render={() => (
                      <Fragment>
                        <Element flexRow flex="999 1 auto" justifyContent="space-between">
                          <Menu links={PRIMARY_LINKS} />
                          {expanded && <Menu links={SECONDARY_LINKS} />}
                        </Element>
                        {!expanded && <Hamburger onToggle={onHamburgerToggle} />}
                      </Fragment>
                    )}
                  />
                </Switch>
              </Nav>
              <OffCanvasMenu
                links={SECONDARY_LINKS}
                isVisible={showOffCanvasMenu}
                onClose={onMenuClose}
              />
            </Fragment>
          )}
        />
      </ConnectedSwitch>
    </Header>
  );
}

export class SiteHeaderContainer extends React.PureComponent {
  static propTypes = {
    locationPath: PropTypes.string.isRequired,
  };

  state = {
    offCanvasMenuActive: false,
    allLinksFit: null,
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
      allLinksFit: window.innerWidth > MIN_VIEWPORT_SIZE,
    });
  }, 150);

  hideOffCanvasMenu = () => {
    this.setState({ offCanvasMenuActive: false });
  };

  showOffCanvasMenu = () => {
    this.setState({ offCanvasMenuActive: true });
  };

  render() {
    const viewportMeasured = this.state.allLinksFit != null;
    return (
      viewportMeasured &&
      hasToken() && (
        <SiteHeader
          expanded={this.state.allLinksFit}
          showOffCanvasMenu={this.state.offCanvasMenuActive}
          onHamburgerToggle={this.showOffCanvasMenu}
          onMenuClose={this.hideOffCanvasMenu}
        />
      )
    );
  }
}

const mapStateToProps = (state, props) => ({
  locationPath: selectLocationPath(state, props),
});

export default connect(mapStateToProps)(SiteHeaderContainer);
