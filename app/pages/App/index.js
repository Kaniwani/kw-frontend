import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Provider as ThemeProvider } from 'rebass';

import user from 'features/user/actions';
import { hasToken } from 'common/utils/auth';
import { selectLocationPath, selectMaintenance } from 'common/selectors';
import { cyan } from 'common/styles/colors';

import Routes from 'common/routes';

import ScrollToTop from 'common/components/ScrollToTop';
import A from 'common/components/A';
import VideoBanner from 'common/components/VideoBanner';
import SiteHeader from 'features/navigation/SiteHeader';
import SiteFooter from 'features/navigation/SiteFooter';

import MAINTENANCE_IMG from 'common/assets/loops/confused.jpg';
import MAINTENANCE_MP4 from 'common/assets/loops/confused.mp4';
import MAINTENANCE_WEBM from 'common/assets/loops/confused.webm';

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
    underMaintenance: PropTypes.bool.isRequired,
    path: PropTypes.string.isRequired,
    loadUser: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (hasToken()) {
      this.props.loadUser();
    }
  }

  componentDidUpdate(prevProps) {
    // ensure route change scrolls to top of page
    if (this.props.path !== prevProps.path) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { underMaintenance } = this.props;
    return (
      <AppWrapper>
        <Helmet titleTemplate="%s - KaniWani">
          <meta name="description" content="KaniWani - An English to Japanese SRS Quiz App" />
        </Helmet>
        {underMaintenance ? (
          <VideoBanner
            active={!underMaintenance}
            sources={{ mp4: MAINTENANCE_MP4, webm: MAINTENANCE_WEBM, jpg: MAINTENANCE_IMG }}
            headerText="Huh, where’d KW go?"
            subHeaderText={
              <Fragment>
                We’re probably rebooting the server. Check in with us on{' '}
                <A href="https://rauchg-slackin-iurjmkotad.now.sh" external color={cyan[4]}>
                  Slack
                </A>.
              </Fragment>
            }
          />
        ) : (
          <Fragment>
            <SiteHeader />
            <main>
              <ThemeProvider>
                <Routes />
                <ScrollToTop />
              </ThemeProvider>
            </main>
            <SiteFooter />
          </Fragment>
        )}
      </AppWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  underMaintenance: selectMaintenance(state),
  path: selectLocationPath(state),
});

const mapDispatchToProps = {
  loadUser: user.load.request,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
