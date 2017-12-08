import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import cuid from 'cuid';

import Container from 'base/Container';
import Element from 'base/Element';
import H2 from 'base/H2';
import Ul from 'base/Ul';
import SrsChart from 'components/SrsChart';
import UpcomingReviewsChart from 'components/UpcomingReviewsChart';
import Announcement from 'containers/Announcement';

import PageWrapper from 'base/PageWrapper';
import ReviewStatus from 'components/ReviewStatus';
import ApiKeyCheck from './ApiKeyCheck';

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
          <H2>News & Updates</H2>
        </Element>
        <Ul plainList>
          {announcements.map((item) => <Announcement key={cuid()} {...item} />)}
        </Ul>
      </Container>
    </PageWrapper>
  );
}

export default View;
