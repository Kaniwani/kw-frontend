import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import ReactTooltip from 'react-tooltip';
import Routes from 'routes';
import withProgressBar from 'components/ProgressBar';
import { makeSelectLocation } from './selectors';

function App() {
  return (
    <div>
      <Helmet titleTemplate="%s - KaniWani">
        <meta name="description" content="KaniWani - An English to Japanese SRS Quiz WebApp" />
      </Helmet>
      <ReactTooltip id="globalTooltip" />
      <Routes />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
});

export default withProgressBar(connect(mapStateToProps)(App));
