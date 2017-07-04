import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SessionPage from 'containers/SessionPage/Loadable';
import SessionSummaryPage from 'containers/SessionSummaryPage';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

function QuizRoutes() {
  return (
    <Switch>
      <Route exact path="/:category/session" component={SessionPage} />
      <Route exact path="/:category" component={SessionSummaryPage} />
      <Route path="" component={NotFoundPage} />
    </Switch>
  );
}

export default QuizRoutes;
