import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Immutable from 'immutable';
import debounce from 'lodash/debounce';
import { breakpoints } from 'shared/styles/media';
import { StyledHeader } from './styles';
import { navRoutes } from './constants';

import {
  selectReviewCount,
} from 'containers/HomePage/selectors';

import Container from 'components/Container';
import Wrapper from 'components/Wrapper';
import Element from 'components/Element';
import DesktopNav from 'components/DesktopNav';
import MobileNav from 'components/MobileNav';
import LogoLink from 'components/LogoLink';

class SiteHeader extends React.PureComponent {
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
  }

  componentDidMount = () => {
    debounce(() => this.setState({ headerHeight: this.header.clientHeight }), 200);
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
          <Container flexRow justifyContent="space-between" alignItems="center">
            <Element flexCol flexCenter>
              <LogoLink size="4em" />
            </Element>
            <Element>
              {this.renderNavigation()}
            </Element>
          </Container>
        </Wrapper>
      </StyledHeader>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  reviewCount: selectReviewCount(),
  navRoutes: () => navRoutes,
});

export default connect(mapStateToProps)(SiteHeader);
