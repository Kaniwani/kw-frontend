import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectUserLastLoad, selectUpcomingReviewsTotal } from 'features/user/selectors';
import { isBefore, addMinutes } from 'date-fns';

import Spinner from 'common/components/Spinner';
import Container from 'common/components/Container';
import Element from 'common/components/Element';
import H2 from 'common/components/H2';
import H3 from 'common/components/H3';
import Announcements from 'features/announcements';
import SrsChart from './SrsChart';
import UpcomingReviewsChart from './UpcomingReviewsChart';
import ReviewStatus from './ReviewStatus';
import SearchBar from 'features/search/SearchBar';
import SearchResults from 'features/search/SearchResults';

import { grey } from 'common/styles/colors';

Dashboard.propTypes = {
  upcomingReviewsTotal: PropTypes.number.isRequired,
  showLoading: PropTypes.bool.isRequired,
};

function Dashboard({ upcomingReviewsTotal, showLoading }) {
  return showLoading ? (
    <Container>
      <Spinner />
    </Container>
  ) : (
    <Fragment>
      <Container>
        <ReviewStatus />
      </Container>
      <Container flexColumn>
        <SearchBar />
        <SearchResults />
      </Container>
      <Container>
        <Element flexColumn flexCenter>
          <H2 style={{ color: grey[8] }}>Coming Up</H2>
          {upcomingReviewsTotal > 0 && (
            <H3 style={{ fontWeight: 500, color: grey[9] }}>{upcomingReviewsTotal} reviews</H3>
          )}
        </Element>
        <UpcomingReviewsChart />
      </Container>
      <Container flexRow justifyContent="center" flexWrap>
        <Container flex="0 1 550px">
          <Element flexRow flexCenter>
            <H2 style={{ color: grey[8] }}>SRS Progress</H2>
          </Element>
          <SrsChart />
        </Container>
        <Container flex="0 1 32em" flexColumn flexCenter>
          <Element>
            <H2 style={{ color: grey[8] }}>News & Updates</H2>
          </Element>
          <Announcements />
        </Container>
      </Container>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  const lastLoad = selectUserLastLoad(state);
  const showLoading = !lastLoad || isBefore(lastLoad, addMinutes(Date.now(), -60));
  return {
    showLoading,
    upcomingReviewsTotal: selectUpcomingReviewsTotal(state),
  };
};

export default connect(mapStateToProps)(Dashboard);
