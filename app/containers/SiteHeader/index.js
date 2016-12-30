import React, { PropTypes } from 'react';
import Immutable, { fromJS } from 'immutable';
import debounce from 'lodash/debounce';
import { breakpoints } from 'shared/styles/media';
import { StyledHeader, StyledWrapper } from './styles';

import Section from 'components/Section';
import DesktopNav from 'components/DesktopNav';
import MobileNav from 'components/MobileNav';
import LogoLink from 'components/LogoLink';


const siteLinks = fromJS([
  {
    text: 'Reviews',
    to: '/review',
    count: 23,
  }, {
    text: 'Vocabulary',
    to: '/vocabulary',
  }, {
    text: 'Settings',
    to: '/settings',
  }, {
    text: 'About',
    to: '/about',
  }, {
    text: 'Contact',
    to: '/contact',
  }, {
    text: 'Logout',
    to: '/logout',
  },
]);


class SiteHeader extends React.PureComponent {
  static propTypes = {
    routes: PropTypes.instanceOf(Immutable.Iterable).isRequired,
  }

  static defaultProps = {
    routes: siteLinks, // FIXME: mapStateToProps
  }

  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
      headerHeight: 70, // ballpark fallback
      mobileNavVisible: false,
    };
  }

  componentDidMount = () => {
    // debounce(() => this.setState({ headerHeight: this.header.clientHeight }), 200);
    window.addEventListener('resize', debounce(this._handleResize, 50));
  }

  componentWillUnmount = () => window.removeEventListener('resize', this._handleResize);

  _handleResize = () => {
    this.setState({
      windowWidth: window.innerWidth,
      headerHeight: this.header.clientHeight,
    });
  }

  _handleToggleClick = () => {
    this.setState({ mobileNavVisible: !this.state.mobileNavVisible });
  }

  renderNavigation() {
    if (this.state.windowWidth <= breakpoints.sm) {
      return (
        <MobileNav
          links={this.props.routes}
          offsetTop={this.state.headerHeight}
          visible={this.state.mobileNavVisible}
          handleToggleClick={this._handleToggleClick}
        />
      );
    }
    return <DesktopNav links={this.props.routes} />;
  }

  render() {
    return (
      <StyledHeader innerRef={(node) => { this.header = node; }}>
        <Section>
          <StyledWrapper>
            <LogoLink size="4em" />
            {this.renderNavigation()}
          </StyledWrapper>
        </Section>
      </StyledHeader>
    );
  }
}

// const mapStateToProps = createStructuredSelector({
//   routes: selectNavLinks(),
// });

export default/* connect(mapStateToProps)(*/SiteHeader/* )*/;
