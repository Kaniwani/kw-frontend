import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Immutable from 'immutable';
import debounce from 'lodash/debounce';
import { breakpoints } from 'shared/styles/media';
import { StyledHeader, StyledElement, StyledContainer } from './styles';
import { navRoutes } from './constants';
import { selectReviewCount } from 'containers/App/selectors';

import Wrapper from 'components/Wrapper';
import Element from 'components/Element';
import DesktopNav from 'components/DesktopNav';
import MobileNav from 'components/MobileNav';
import LogoLink from 'components/LogoLink';

export class SiteHeader extends React.Component {
  static propTypes = {
    navRoutes: PropTypes.instanceOf(Immutable.Iterable).isRequired,
    reviewCount: PropTypes.number,
  }

  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
      headerHeight: 70, // ballpark fallback
      mobileNavVisible: false,
    };
    this._handleResize = debounce(() => {
      this.setState({
        windowWidth: window.innerWidth,
        headerHeight: this.header.clientHeight,
      });
    }, 100).bind(this);
  }

  componentDidMount = () => {
    debounce(() => this.setState({ headerHeight: this.header.clientHeight }), 200);
    window.addEventListener('resize', this._handleResize);
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this._handleResize);
  }

  _handleToggleClick = () => {
    this.setState({ mobileNavVisible: !this.state.mobileNavVisible });
  }

  renderNavigation() {
    if (this.state.windowWidth <= breakpoints.sm) {
      return (
        <MobileNav
          reviewCount={this.props.reviewCount}
          links={this.props.navRoutes}
          offsetTop={this.state.headerHeight}
          visible={this.state.mobileNavVisible}
          handleToggleClick={this._handleToggleClick}
        />
      );
    }
    return <DesktopNav reviewCount={this.props.reviewCount} links={this.props.navRoutes} />;
  }

  render() {
    return (
      <StyledHeader innerRef={(node) => { this.header = node; }}>
        <Wrapper>
          <StyledContainer flexRow justifyContent="space-between" alignItems="center">
            <StyledElement flexCol flexCenter>
              <LogoLink size="4em" />
            </StyledElement>
            <Element>
              {this.renderNavigation()}
            </Element>
          </StyledContainer>
        </Wrapper>
      </StyledHeader>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  reviewCount: selectReviewCount,
  navRoutes: () => navRoutes,
});

export default connect(mapStateToProps)(SiteHeader);
