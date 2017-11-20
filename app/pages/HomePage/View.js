import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import Container from 'base/Container';
import Element from 'base/Element';
import H2 from 'base/H2';
import SrsChart from 'components/SrsChart';
import UpcomingReviewsChart from 'components/UpcomingReviewsChart';
import List from 'components/List';
import Announcement from 'components/Announcement';

import PageWrapper from 'base/PageWrapper';
import ReviewStatus from 'components/ReviewStatus';
import Debug from 'utils/Debug';
import ApiKeyCheck from './ApiKeyCheck';
import LastWkSync from './LastWkSync';

View.propTypes = {
  profile: PropTypes.object.isRequired,
  announcements: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function View({ profile, announcements }) {
  return (
    <PageWrapper>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Kaniwani Dashboard Page" />
      </Helmet>
      <Container>
        <ApiKeyCheck valid={profile.isApiValid} />
        <ReviewStatus {...profile} />
        <LastWkSync lastWkSyncDate={profile.lastWkSyncDate} />
      </Container>
      <Container>
        <Element flexRow flexCenter>
          <H2>Coming Up</H2>
        </Element>
        <UpcomingReviewsChart data={profile.upcomingReviews} />
      </Container>
      <Container>
        <Element flexRow flexCenter>
          <H2>SRS Progress</H2>
        </Element>
        <SrsChart data={profile.srsCounts} />
      </Container>
      <Container>
        <Element flexRow flexCenter>
          <H2>Announcements</H2>
        </Element>
        <List items={announcements} RenderItem={Announcement} />
      </Container>
      <Debug value={profile} />
    </PageWrapper>
  );
}

export default View;
