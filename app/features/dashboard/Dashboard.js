import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import showLoadingIf from 'common/utils/showLoadingIf';
import { selectUserLastLoad } from 'features/user/selectors';

import Aux from 'common/components/Aux';
import Container from 'common/components/Container';
import Element from 'common/components/Element';
import H2 from 'common/components/H2';
import Announcements from 'features/announcements';
import SrsChart from './SrsChart';
import UpcomingReviewsChart from './UpcomingReviewsChart';
import ReviewStatus from './ReviewStatus';
import ApiKeyCheck from './ApiKeyCheck';
import SearchBar from 'features/search/SearchBar';
import SearchResults from 'features/search/SearchResults';

export class Dashboard extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.lastLoad.toString() !== nextProps.lastLoad.toString();
  }

  render() {
    return (
      <Aux>
        <Container>
          <h1>service worker test</h1>
          <ApiKeyCheck />
          <ReviewStatus />
        </Container>
        <Container flexColumn>
          <SearchBar />
          <SearchResults />
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
        <Container flexColumn flexCenter textAlign="center">
          <Element flexRow flexCenter>
            <H2>News & Updates</H2>
          </Element>
          <Announcements />
        </Container>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => ({ lastLoad: selectUserLastLoad(state) });

const enhance = compose(connect(mapStateToProps), showLoadingIf(({ lastLoad }) => !lastLoad));

export default enhance(Dashboard);
