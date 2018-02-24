import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { hasToken } from 'common/utils/auth';

import Aux from 'common/components/Aux';
import SiteHeader from 'features/navigation/SiteHeader';
import SiteFooter from 'features/navigation/SiteFooter';
import LandingPage from 'pages/LandingPage/Loadable';
import HomePage from 'pages/HomePage/Loadable';
import VocabLevelsPage from 'pages/VocabLevelsPage/Loadable';
import VocabLevelPage from 'pages/VocabLevelPage/Loadable';
import VocabEntryPage from 'pages/VocabEntryPage/Loadable';
import QuizSessionPage from 'pages/QuizSessionPage/Loadable';
import QuizSummaryPage from 'pages/QuizSummaryPage/Loadable';
import SettingsPage from 'pages/SettingsPage/Loadable';
import AboutPage from 'pages/AboutPage/Loadable';
import ContactPage from 'pages/ContactPage/Loadable';
import NotFoundPage from 'pages/NotFoundPage/Loadable';
import ConfirmResetPasswordPage from 'pages/ConfirmResetPasswordPage/Loadable';

// used for isolated testing of components in development with HMR
import { IS_DEV_ENV } from 'common/constants';
import DevPage from 'pages/DevPage/Loadable';

export function Routes() {
  return (
    <Switch>
      {IS_DEV_ENV && <Route exact path="/dev" component={DevPage} />}
      <Route path="/password-reset/:uid/:token" component={ConfirmResetPasswordPage} />
      <Route exact path="/welcome" component={LandingPage} />
      <Route
        path=""
        render={() => (hasToken() ? renderProtectedRoutes() : <Redirect to="/welcome" />)}
      />
    </Switch>
  );
}

function renderProtectedRoutes() {
  return (
    <Aux>
      <Switch>
        <Route path="/:path(lessons|reviews)" />
        <Route path="" component={SiteHeader} />
      </Switch>
      <main>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/contact" component={ContactPage} />
          <Route exact path="/settings" component={SettingsPage} />
          <Route path="/:category(lessons|reviews)" render={renderQuizRoutes} />
          <Route path="/vocabulary" render={renderVocabularyRoutes} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </main>
      <Switch>
        <Route exact path="/:path(lessons|reviews)" component={SiteFooter} />
        <Route path="/:path(lessons|reviews)" />
        <Route path="/:path(settings|about|contact)" component={SiteFooter} />
        <Route exact path="/vocabulary/levels" component={SiteFooter} />
        <Route exact path="/vocabulary/levels/:id" component={SiteFooter} />
        <Route exact path="/vocabulary/entry/:id" component={SiteFooter} />
        <Route exact path="/" component={SiteFooter} />
        <Route path="" />
      </Switch>
    </Aux>
  );
}

function renderQuizRoutes() {
  return (
    <Switch>
      <Route exact path="/:category/session" component={QuizSessionPage} />
      <Route exact path="/:category" component={QuizSummaryPage} />
      <Route path="" component={NotFoundPage} />
    </Switch>
  );
}

function renderVocabularyRoutes() {
  return (
    <Switch>
      <Redirect exact path="/vocabulary" to="/vocabulary/levels" />
      <Route exact path="/vocabulary/levels" component={VocabLevelsPage} />
      <Route exact path="/vocabulary/levels/:id" component={VocabLevelPage} />
      <Route exact path="/vocabulary/entry/:id" component={VocabEntryPage} />
      <Route path="" component={NotFoundPage} />
    </Switch>
  );
}

export default Routes;
