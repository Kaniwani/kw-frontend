import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import ScrollToTop from 'common/components/ScrollToTop';
import Routes from 'common/routes';
import { user } from 'features/user/actions';
import { selectLocationPath } from 'common/selectors';
import { selectUserShouldLoad } from 'features/user/selectors';
import { hasToken } from 'common/utils/auth';

// ensure footer is flush with bottom of page
// if content in header + main is less than the viewport height
const AppWrapper = styled.div`
  display: flex;
  flex: 1 0 100%;
  flex-flow: column nowrap;
  & > header,
  & > footer {
    flex: 0 0 auto;
  }

  & > main {
    display: flex;
    flex-flow: column nowrap;
    flex: 1 0 auto;
  }
`;

class App extends React.Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
    loadUser: PropTypes.func.isRequired,
    userShouldLoad: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    if (this.props.userShouldLoad && hasToken()) {
      this.props.loadUser();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.userShouldLoad && hasToken()) {
      this.props.loadUser();
    }
    // ensure route change scrolls to top of page
    if (this.props.path !== prevProps.path) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return (
      <AppWrapper>
        <Helmet titleTemplate="%s - KaniWani">
          <meta name="description" content="KaniWani - An English to Japanese SRS Quiz App" />
        </Helmet>
        <Routes />
        <ScrollToTop />
      </AppWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  userShouldLoad: selectUserShouldLoad(state),
  path: selectLocationPath(state),
});

const mapDispatchToProps = {
  loadUser: user.load.request,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
