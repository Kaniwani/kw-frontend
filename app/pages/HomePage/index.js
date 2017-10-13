import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import app from 'containers/App/actions';
import { selectUi, selectProfile } from 'containers/App/selectors';

import Container from 'base/Container';
import Element from 'base/Element';
import H2 from 'base/H2';
import SrsChart from 'components/SrsChart';
import UpcomingReviewsChart from 'components/UpcomingReviewsChart';
import Announcements from 'components/Announcements';

import PageWrapper from 'base/PageWrapper';
import ReviewStatus from 'components/ReviewStatus';
import Debug from 'utils/Debug';
import ApiKeyCheck from './ApiKeyCheck';
import LastWkSync from './LastWkSync';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    profile: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    loadUser: PropTypes.func.isRequired,
    forceSrs: PropTypes.func.isRequired,
    forceWkSrs: PropTypes.func.isRequired,
  }

  componentDidMount() {
    if (!this.props.isLoading) {
      this.props.loadUser();
    }
  }

  render() {
    const { profile, forceSrs, forceWkSrs } = this.props;
    return (
      <PageWrapper>
        <Helmet>
          <title>Dashboard</title>
          <meta name="description" content="Kaniwani Dashboard Page" />
        </Helmet>
        <Container>
          <ApiKeyCheck valid={profile.isApiValid} />
          <ReviewStatus />
          <LastWkSync />
        </Container>
        <Container>
          <Element flexRow flexCenter>
            <H2>Coming Up</H2>
          </Element>
          <UpcomingReviewsChart />
        </Container>
        <Container>
          <Element flexRow flexCenter>
            <H2>SRS Progress</H2>
          </Element>
          <SrsChart />
        </Container>
        <Container>
          <Element flexRow flexCenter>
            <H2>Announcements</H2>
          </Element>
          <Announcements />
        </Container>
        <button type="button" onClick={forceSrs}>force kw srs</button>
        <button type="button" onClick={forceWkSrs}>force wk srs</button>
        <Debug value={profile} />
      </PageWrapper>
    );
  }
}


const mapStateToProps = (state) => ({
  profile: selectProfile(state),
  isLoading: selectUi(state).user.loading,
});

const mapDispatchToProps = {
  loadUser: app.user.load.request,
  forceSrs: app.user.srs.request,
  forceWkSrs: app.user.wksrs.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
