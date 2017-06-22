import React from 'react';
import Helmet from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

import SiteHeader from 'components/SiteHeader';
import SessionSummaryHeader from 'components/SessionSummaryHeader';
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
          <Route path="/summary">
            <SessionSummaryHeader category="correct" linkRoute="review" />
          </Route>
          <Route path="/review" />
          <Route path="/welcome" />
          <Route path="/" component={SiteHeader} />
        </Switch>

        <Switch>
          <Route exact path="/" component={HomePage} />
          {/* TODO: other routes! */}
          <Route path="/review" render={() => <p>Hello Dear</p>} />
          <Route path="/summary" render={() => <p>Hello Summary</p>} />
          <Route path="/welcome" component={LandingPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
