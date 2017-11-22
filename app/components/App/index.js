import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import WelcomePage from 'pages/WelcomePage/Loadable';
import ProtectedRoutes from 'components/ProtectedRoutes/Loadable';

import { hasToken } from 'utils/auth';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 100%;
`;

class App extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  };

  // ensure route change scrolls to top of page
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const loggedIn = hasToken();
    return (
      <Wrapper>
        <Helmet titleTemplate="%s - KaniWani">
          <meta
            name="description"
            content="KaniWani - An English to Japanese SRS Quiz App"
          />
        </Helmet>
        <Switch>
          <Route exact path="/welcome" component={WelcomePage} />
          <Route
            path=""
            render={() =>
              loggedIn ? <ProtectedRoutes /> : <Redirect to="/welcome" />}
          />
        </Switch>
      </Wrapper>
    );
  }
}

export default withRouter(App);
