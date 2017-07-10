import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import PageWrapper from 'base/PageWrapper';
import {
  selectProfile,
  selectDashboard,
} from 'containers/App/selectors';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    profile: PropTypes.object,
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
        <h6>profile</h6>
        <pre><code className="language-javascript">{JSON.stringify(this.props.profile, null, 2)}</code></pre>
        <h6>dashboard</h6>
        <pre><code className="language-javascript">{JSON.stringify(this.props.dashboard, null, 2)}</code></pre>
      </PageWrapper>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  profile: selectProfile,
  dashboard: selectDashboard,
});

export default connect(mapStateToProps)(HomePage);
