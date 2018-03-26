import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Provider as ThemeProvider } from 'rebass';

import { ffBody } from 'common/styles/typography';
import user from 'features/user/actions';
import { selectLocationPath } from 'common/selectors';

import Routes from 'common/routes';

import ScrollToTop from 'common/components/ScrollToTop';
import SiteHeader from 'features/navigation/SiteHeader';
import SiteFooter from 'features/navigation/SiteFooter';
import Notify from 'features/notifications/Notify';

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
    loadQuizCounts: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.loadQuizCounts();
    this.props.loadUser();
  }

  componentDidUpdate(prevProps) {
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
        <Notify />
        <SiteHeader />
        <main>
          <ThemeProvider theme={{ fonts: { sans: ffBody } }}>
            <Routes />
            <ScrollToTop />
          </ThemeProvider>
        </main>
        <SiteFooter />
      </AppWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  path: selectLocationPath(state),
});

const mapDispatchToProps = {
  loadUser: user.load.request,
  loadQuizCounts: user.quizCounts.request,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
