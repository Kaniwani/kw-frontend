import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  selectUserLastLoad,
  selectUpcomingReviewsTotal,
  selectNextReviewCount,
} from 'features/user/selectors';

import { grey } from 'common/styles/colors';

import Spinner from 'common/components/Spinner';
import Container from 'common/components/Container';
import Element from 'common/components/Element';
import H2 from 'common/components/H2';
import H3 from 'common/components/H3';
import Announcements from 'features/announcements';
import SrsChart from './SrsChart';
import UpcomingReviewsChart from './UpcomingReviewsChart';
import ReviewStatus from './ReviewStatus';
import ApiKeyCheck from './ApiKeyCheck';
import SearchBar from 'features/search/SearchBar';
import SearchResults from 'features/search/SearchResults';

Dashboard.propTypes = {
  upcomingReviewsTotal: PropTypes.number.isRequired,
  nextReviewCount: PropTypes.number.isRequired,
  lastLoad: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.oneOf([false])]).isRequired,
};

function Dashboard({ upcomingReviewsTotal, nextReviewCount, lastLoad }) {
  return !lastLoad ? (
    <Spinner />
  ) : (
    <Fragment>
      <Container>
        <ApiKeyCheck />
        <ReviewStatus />
      </Container>
      <Container flexColumn>
        <SearchBar />
        <SearchResults />
      </Container>
      <Container>
        <Element flexColumn flexCenter>
          <H2 style={{ color: grey[8] }}>Coming Up</H2>
          {!!upcomingReviewsTotal && (
            <H3 style={{ fontWeight: 500, color: grey[8] }}>
              <span style={{ paddingRight: '1rem' }}>
                Next: <span style={{ color: grey[9] }}>{nextReviewCount}</span>
              </span>
              <span>
                Total: <span style={{ color: grey[9] }}>{upcomingReviewsTotal}</span>
              </span>
            </H3>
          )}
        </Element>
        <UpcomingReviewsChart />
      </Container>
      <Container>
        <Element flexRow flexCenter>
          <H2 style={{ color: grey[8] }}>SRS Progress</H2>
        </Element>
        <SrsChart />
      </Container>
      <Container flexColumn flexCenter textAlign="center">
        <Element flexRow flexCenter>
          <H2 style={{ color: grey[8] }}>News & Updates</H2>
        </Element>
        <Announcements />
      </Container>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  lastLoad: selectUserLastLoad(state),
  upcomingReviewsTotal: selectUpcomingReviewsTotal(state),
  nextReviewCount: selectNextReviewCount(state),
});

export default connect(mapStateToProps)(Dashboard);
