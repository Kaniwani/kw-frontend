import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import format from 'date-fns/format';

import { DATE_IN_WORDS } from 'shared/constants';
import app from 'containers/App/actions';

import Element from 'base/Element';
import Container from 'base/Container';
import H1 from 'base/H1';
import H3 from 'base/H3';
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
    return (
      <PageWrapper>
        <Helmet>
          <title>Dashboard</title>
          <meta name="description" content="Kaniwani Dashboard Page" />
        </Helmet>
        <Container flexRow>
          <Element flex="1 0 50%">
            <H1>{profile.name}</H1>
            <H3>Next Hour: {dashboard.nextHourReviews}</H3>
            <H3>Next Day: {dashboard.nextDayReviews}</H3>
            <H4>Next Review Session: {format(dashboard.nextReviewDate, DATE_IN_WORDS)}</H4>
            <H4>Last Sync with WK: {format(dashboard.lastWkSyncDate, DATE_IN_WORDS)}</H4>
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
