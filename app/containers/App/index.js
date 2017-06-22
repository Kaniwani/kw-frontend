import React from 'react';
import Helmet from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

import SiteHeader from 'components/SiteHeader';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

// must be Component not stateless for Loadable to work
export class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet titleTemplate="%s - KaniWani">
          <meta name="description" content="KaniWani - An English to Japanese SRS Quiz WebApp" />
        </Helmet>
        <ReactTooltip id="globalTooltip" />
        <Route
          path="/"
          render={({ location }) => location.pathname !== '/review' && <SiteHeader />}
        />
        <Switch>
          <Route exact path="/" component={HomePage} />
          {/* TODO: other routes! */}
          <Route path="" component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
