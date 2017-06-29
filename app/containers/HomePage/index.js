import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import PageWrapper from 'base/PageWrapper';
import { makeSelectUser, makeSelectDashboard } from 'containers/App/selectors';
import { makeSelectHomePage } from './selectors';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    homePage: PropTypes.object,
    user: PropTypes.object,
    dashboard: PropTypes.object,
  }

  render() {
    return (
      <PageWrapper>
        <Helmet
          title="Dashboard"
          meta={[{ name: 'description', content: 'Dashboard' }]}
        />
        <h1>HomePage!</h1>
        <h6>homePage</h6>
        <pre><code>{JSON.stringify(this.props.homePage, null, 2)}</code></pre>
        <h6>user</h6>
        <pre><code>{JSON.stringify(this.props.user, null, 2)}</code></pre>
        <h6>dashboard</h6>
        <pre><code>{JSON.stringify(this.props.dashboard, null, 2)}</code></pre>
      </PageWrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage(),
  user: makeSelectUser(),
  dashboard: makeSelectDashboard(),
});

export default connect(mapStateToProps)(HomePage);
