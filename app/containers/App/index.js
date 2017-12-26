import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import { Helmet } from "react-helmet";
import styled from "styled-components";

import { app } from "shared/actions";
import { hasToken } from "utils/auth";
import ReactTooltip from "react-tooltip";
import ErrorBoundary from "components/ErrorBoundary";
import ScrollToTop from "components/ScrollToTop";
import Routing from "containers/Routing";

const Page = styled.div`
  display: flex;
  flex: 1 0 100%;
  flex-flow: column nowrap;
  & > header,
  & > footer {
    flex: 0 0 auto;
  }

  & > main {
    flex: 1 0 auto;
  }
`;

class App extends React.Component {
  static propTypes = {
    loadUser: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
  };

  componentDidMount() {
    // dashboard refreshes user every mount anyway, so skip if we're at root path
    if (hasToken() && this.props.location.path !== "/") {
      this.props.loadUser();
    }
  }

  // ensure route change scrolls to top of page
  componentDidUpdate(prevProps) {
    if (this.props.location.path !== prevProps.location.path) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return (
      <Page>
        <Helmet titleTemplate="%s - KaniWani">
          <meta
            name="description"
            content="KaniWani - An English to Japanese SRS Quiz App"
          />
        </Helmet>
        <ErrorBoundary>
          <Routing loggedIn={hasToken()} />
          <ReactTooltip id="globalTooltip" />
          <ScrollToTop />
        </ErrorBoundary>
      </Page>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadUser: () => dispatch(app.user.load.request()),
});

export default withRouter(connect(null, mapDispatchToProps)(App));
