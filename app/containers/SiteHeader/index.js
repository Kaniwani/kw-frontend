import React, { PropTypes } from 'react';
import Immutable, { fromJS } from 'immutable';
import { breakpoints } from 'shared/styles/media';
import { StyledHeader, StyledWrapper } from './styles';

import Section from 'components/Section';
import DesktopNav from 'components/DesktopNav';
import MobileNav from 'components/MobileNav';
import LogoLink from 'components/LogoLink';


const tempLinks = fromJS([
  {
    text: 'Reviews',
    to: '/review',
    count: 23,
  }, {
    text: 'Vocabulary',
    to: '/vocabulary',
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
    routes: tempLinks, // FIXME: mapStateToProps
  }

  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
      mobileNavVisible: true, // change to redux state so MenuToggle can dispatch action
    };
  }

  // FIXME: debounce these
  componentDidMount = () => window.addEventListener('resize', this._handleResize)
  componentWillUnmount = () => window.removeEventListener('resize', this._handleResize)

  _handleResize = () => this.setState({ windowWidth: window.innerWidth });
  _handleToggleClick = () => this.setState({ mobileNavVisible: true });

  renderNavigation() {
    return this.state.windowWidth <= breakpoints.sm ?
      <MobileNav links={this.props.routes} visible={this.state.mobileNavVisible} handleToggleClick={this._handleToggleClick} /> :
      <DesktopNav links={this.props.routes} />;
  }

  render() {
    return (
      <StyledHeader>
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
