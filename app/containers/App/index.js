import React from 'react';
import Helmet from 'react-helmet';
import { Switch, Route, Redirect } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

import SiteHeader from 'components/SiteHeader';
import WelcomePage from 'containers/WelcomePage';
import HomePage from 'containers/HomePage/Loadable';
import ReviewsPage from 'containers/ReviewsPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

const renderProtectedRoutes = () => (
  <div>
    <Switch>
      <Route path="/:path(lessons|reviews)" /* render nothing */ />
      <Route path="" component={SiteHeader} />
    </Switch>
    <ReactTooltip id="globalTooltip" />
    {/* Notifications */}
    <Switch>
      {/* TODO: first route should check if logged in in render={() => {}} and if not then redirect to landingpage */}
      <Route exact path="/" component={HomePage} />
      {/* <Route path="/lessons" component={LessonsPage} /> */}
      <Route path="/reviews" component={ReviewsPage} />
      {/* <Route path="/vocabulary" component={VocabularyPage} /> */}
      <Route exact path="/about" render={() => <h1>about</h1>} />
      <Route exact path="/contact" render={() => <h1>contact</h1>} />
      {/* TODO: handle token clear logout action in redirect or in SiteHeader link */}
      <Redirect exact path="/logout" to="/welcome" />
      <Route path="" component={NotFoundPage} />
    </Switch>
  </div>
);

// TODO: should check for JWT token ~
const LOGGED_IN = false;

// must be React.Component not stateless for Loadable to work
export class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet titleTemplate="%s - KaniWani">
          <meta name="description" content="KaniWani - An English to Japanese SRS Quiz App" />
        </Helmet>
        <Switch>
          <Route exact path="/welcome" component={WelcomePage} />
          <Route path="" render={() => LOGGED_IN ? renderProtectedRoutes() : <Redirect to="/welcome" />} />
        </Switch>
      </div>
    );
  }
}

export default App;
