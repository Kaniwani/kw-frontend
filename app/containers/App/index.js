import React from 'react';
import Helmet from 'react-helmet';
import { Switch, Route, Redirect } from 'react-router-dom';

import WelcomePage from 'containers/WelcomePage';
import ProtectedRoutes from 'containers/ProtectedRoutes';

import { hasToken } from 'utils/auth';

// must be React.Component not stateless for Loadable to work
class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet titleTemplate="%s - KaniWani">
          <meta name="description" content="KaniWani - An English to Japanese SRS Quiz App" />
        </Helmet>
        <Switch>
          <Route exact path="/welcome" component={WelcomePage} />
          <Route path="" render={() => hasToken() ? <ProtectedRoutes /> : <Redirect to="/welcome" />} />
        </Switch>
      </div>
    );
  }
}

export default App;
