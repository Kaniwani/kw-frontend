import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import app from 'containers/App/actions';

import Container from 'base/Container';
import Element from 'base/Element';
import H1 from 'base/H1';
import H4 from 'base/H4';
import SrsChart from 'components/SrsChart';
import UpcomingReviewsChart from 'components/UpcomingReviewsChart';

import PageWrapper from 'base/PageWrapper';
import ReviewStatus from 'components/ReviewStatus';
import Debug from 'utils/Debug';

import {
  selectProfile,
  selectDashboard,
} from 'containers/App/selectors';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    profile: PropTypes.object,
    dashboard: PropTypes.object,
    forceSrs: PropTypes.func.isRequired,
    forceWkSrs: PropTypes.func.isRequired,
  }

  render() {
    const { profile, dashboard, forceSrs, forceWkSrs } = this.props;

    return (
      <PageWrapper>
        <Helmet>
          <title>Dashboard</title>
          <meta name="description" content="Kaniwani Dashboard Page" />
        </Helmet>
        <Container>
          <ReviewStatus />
          <UpcomingReviewsChart />
          <SrsChart />
        </Container>
        <Container>
          <H4>Recently Unlocked</H4>
        </Container>
        <Container>
          <H4>Announcements</H4>
        </Container>
        <button type="button" onClick={forceSrs}>force kw srs</button>
        <button type="button" onClick={forceWkSrs}>force wk srs</button>
        <H4>Last Sync with WK: {
          distanceInWordsToNow(dashboard.lastWkSyncDate, { includeSeconds: true, suffix: true })
        } ago</H4>
        <Debug value={profile} />
        <Debug value={dashboard} />
      </PageWrapper>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  profile: selectProfile,
  dashboard: selectDashboard,
});

const mapDispatchToProps = {
  forceSrs: app.user.srs.request,
  forceWkSrs: app.user.wksrs.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
