import React from 'react';
import Helmet from 'react-helmet';
import { Switch, Route, Redirect } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

import LandingPage from 'layouts/LandingPage';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

// must be React.Component not stateless for Loadable to work
export class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet titleTemplate="%s - KaniWani">
          <meta name="description" content="KaniWani - An English to Japanese SRS Quiz WebApp" />
        </Helmet>
        <ReactTooltip id="globalTooltip" />
        <Switch>
          {/* TODO: first route should check if logged in in render={() => {}} and if not then redirect to landingpage */}
          <Route exact path="/" component={HomePage} />
          <Route path="/welcome" component={LandingPage} />
          <Route path="/lessons" render={() => <h1>lessons</h1>} />
          <Route path="/reviews" render={() => <h1>reviews</h1>} />
          <Route path="/about" render={() => <h1>about</h1>} />
          <Route path="/contact" render={() => <h1>contact</h1>} />
          <Redirect path="/logout" to="/welcome" />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
