import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import Aux from 'base/Aux';
import SiteHeader from 'containers/SiteHeader';
import SiteFooter from 'containers/SiteFooter';
import WelcomePage from 'pages/WelcomePage/Loadable';
import HomePage from 'pages/HomePage/Loadable';
import VocabLevelsPage from 'pages/VocabLevelsPage/Loadable';
import VocabLevelPage from 'pages/VocabLevelPage/Loadable';
import VocabEntryPage from 'pages/VocabEntryPage/Loadable';
import QuizPage from 'pages/QuizPage/Loadable';
import QuizSummaryPage from 'pages/QuizSummaryPage/Loadable';
import AboutPage from 'pages/AboutPage/Loadable';
import ContactPage from 'pages/ContactPage/Loadable';
import SettingsPage from 'pages/SettingsPage/Loadable';
import NotFoundPage from 'pages/NotFoundPage/Loadable';

// used for isolated testing of components in development with HMR
import { IS_DEV_ENV } from 'shared/constants';
import DevPage from 'pages/DevPage/Loadable';

Routing.propTypes = {
  loggedIn: PropTypes.bool,
};

Routing.defaultProps = {
  loggedIn: false,
};

function Routing(props) {
  return (
    <Switch>
      {IS_DEV_ENV && <Route exact path="/dev" component={DevPage} />}
      <Route exact path="/welcome" component={WelcomePage} />
      <Route path="" render={() => !props.loggedIn ? <Redirect to="/welcome" /> : renderProtectedRoutes()} />
    </Switch>
  );
}

function renderProtectedRoutes() {
  return (
    <Aux>
      <header>
        <Switch>
          <Route path="/:path(lessons|reviews)" /* don't render */ />
          <Route path="" component={SiteHeader} />
        </Switch>
      </header>
      <main>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/contact" component={ContactPage} />
          <Route exact path="/settings" component={SettingsPage} />
          <Route path="/:category(lessons|reviews)">
            <Switch>
              <Route exact path="/:category/session" component={QuizPage} />
              <Route exact path="/:category" component={QuizSummaryPage} />
              <Route path="" component={NotFoundPage} />
            </Switch>
          </Route>
          <Route exact path="/vocabulary" component={VocabLevelsPage} />
          <Route exact path="/vocabulary/levels" component={VocabLevelsPage} />
          <Route exact path="/vocabulary/levels/:id" component={VocabLevelPage} />
          <Route exact path="/vocabulary/entry/:id" component={VocabEntryPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </main>
      <footer>
        <Switch>
          <Route path="/:path(lessons|reviews)" /* don't render */ />
          <Route path="/:path(settings|about|contact)" component={SiteFooter} />
          <Route exact path="/vocabulary/levels" component={SiteFooter} />
          <Route exact path="/vocabulary/levels/:id" component={SiteFooter} />
          <Route exact path="/vocabulary/entry/:id" component={SiteFooter} />
          <Route exact path="/" component={SiteFooter} />
          <Route path="" /* don't render for 404 */ />
        </Switch>
      </footer>
    </Aux>
  );
}

export default withRouter(Routing);
