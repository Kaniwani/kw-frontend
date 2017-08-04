import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import isPast from 'date-fns/is_past';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import app from 'containers/App/actions';

import Element from 'base/Element';
import Container from 'base/Container';
import H1 from 'base/H1';
import H4 from 'base/H4';
import SrsDonut from 'components/SrsDonut';

import PageWrapper from 'base/PageWrapper';
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
  }

  render() {
    const { profile, dashboard, forceSrs } = this.props;
    const nextReviewStatus = (reviewsCount, nextReviewDate) => {
      if (!reviewsCount && nextReviewDate == null) return 'No reviews available';
      if (isPast(nextReviewDate)) return 'Now!';
      return distanceInWordsToNow(nextReviewDate, { includeSeconds: true, suffix: true });
    };
    return (
      <PageWrapper>
        <Helmet>
          <title>Dashboard</title>
          <meta name="description" content="Kaniwani Dashboard Page" />
        </Helmet>
        <Container flexRow>
          <Element flex="1 0 50%">
            <H1>{profile.name}</H1>
            <H4>Next Review Session: {nextReviewStatus(dashboard.reviewsCount, dashboard.nextReviewDate)}</H4>
            <H4>Next Hour Reviews: {dashboard.nextHourReviews}</H4>
            <H4>Next Day Reviews: {dashboard.nextDayReviews}</H4>
            <H4>Last Sync with WK: {
              distanceInWordsToNow(dashboard.lastWkSyncDate, { includeSeconds: true, suffix: true })
            } ago</H4>
          </Element>
          <Element flex="1 0 50%">
            <SrsDonut />
          </Element>
        </Container>
        <button type="button" onClick={forceSrs}>force srs</button>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
