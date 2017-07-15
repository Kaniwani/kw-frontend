import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import format from 'date-fns/format';

import { DATE_IN_WORDS } from 'shared/constants';

import H1 from 'base/H1';
import H2 from 'base/H2';
import H3 from 'base/H3';
import H4 from 'base/H4';

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
    const { profile, dashboard } = this.props;
    return (
      <PageWrapper>
        <Helmet
          title="Dashboard"
          meta={[{ name: 'description', content: 'Dashboard' }]}
        />
        <H1>{profile.name}</H1>
        <H3>Next Hour: {dashboard.nextHourReviews}</H3>
        <H3>Next Day: {dashboard.nextDayReviews}</H3>
        <H4>Last Sync with WK: {format(dashboard.lastWkSyncDate, DATE_IN_WORDS)}</H4>
      </PageWrapper>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  profile: selectProfile,
  dashboard: selectDashboard,
});

export default connect(mapStateToProps)(HomePage);
