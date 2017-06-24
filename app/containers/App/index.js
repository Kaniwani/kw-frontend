import React from 'react';
import Helmet from 'react-helmet';
import { Switch, Route, Redirect } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

import SiteHeader from 'components/SiteHeader';
import WelcomePage from 'containers/WelcomePage';
import HomePage from 'containers/HomePage/Loadable';
import ReviewsPage from 'containers/ReviewsPage/Loadable';
import VocabularyPage from 'containers/VocabularyPage/Loadable';
import AboutPage from 'containers/AboutPage/Loadable';
import ContactPage from 'containers/ContactPage/Loadable';
import SettingsPage from 'containers/SettingsPage/Loadable';
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
      <Route exact path="/" component={HomePage} />
      <Route exact path="/about" component={AboutPage} />
      <Route exact path="/contact" component={ContactPage} />
      <Route exact path="/settings" component={SettingsPage} />
      <Redirect exact path="/logout" to="/welcome" />
      {/* <Route path="/lessons" component={LessonsPage} /> */}
      <Route path="/reviews" component={ReviewsPage} />
      <Route path="/vocabulary" component={VocabularyPage} />
      {/* TODO: handle token clear logout action in redirect or in SiteHeader link */}
      <Route path="" component={NotFoundPage} />
    </Switch>
  </div>
);

// TODO: should check for JWT token ~
const LOGGED_IN = true;

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
