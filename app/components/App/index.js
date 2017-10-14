import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import WelcomePage from 'pages/WelcomePage/Loadable';
import ProtectedRoutes from 'components/ProtectedRoutes/Loadable';

import { hasToken } from 'utils/auth';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 100%;
`;

// must be React.Component not stateless for Loadable to work
class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const loggedIn = hasToken();
    return (
      <Wrapper>
        <Helmet titleTemplate="%s - KaniWani">
          <meta name="description" content="KaniWani - An English to Japanese SRS Quiz App" />
        </Helmet>
        <Switch>
          <Route exact path="/welcome" component={WelcomePage} />
          <Route path="" render={() => loggedIn ? <ProtectedRoutes /> : <Redirect to="/welcome" />} />
        </Switch>
      </Wrapper>
    );
  }
}

export default App;
