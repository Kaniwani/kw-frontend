import React from 'react';
import Helmet from 'react-helmet';
import { Switch, Route, Redirect } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

import SiteHeader from 'components/SiteHeader';
import WelcomePage from 'containers/WelcomePage';
import HomePage from 'containers/HomePage/Loadable';
import ReviewsPage from 'containers/ReviewsPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

const siteHeaderPaths = /^\/(?!welcome|reviews|lessons).*$/; // not starting with /welcome, /reviews etc

// must be React.Component not stateless for Loadable to work
export class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet titleTemplate="%s - KaniWani">
          <meta name="description" content="KaniWani - An English to Japanese SRS Quiz WebApp" />
        </Helmet>
        <Route path={siteHeaderPaths} component={SiteHeader} />
        <ReactTooltip id="globalTooltip" />

        {/* Notifications */}
        <Switch>
          {/* TODO: first route should check if logged in in render={() => {}} and if not then redirect to landingpage */}
          <Route exact path="/" component={HomePage} />
          <Route path="/welcome" component={WelcomePage} />
          {/* <Route path="/lessons" component={LessonsPage} */}
          <Route path="/reviews" component={ReviewsPage} />
          {/* <Route path="/vocabulary" component={VocabularyPage} /> */}
          <Route path="/about" render={() => <h1>about</h1>} />
          <Route path="/contact" render={() => <h1>contact</h1>} />
          {/* TODO: handle token clear logout action in redirect or in SiteHeader link */}
          <Redirect path="/logout" to="/welcome" />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
