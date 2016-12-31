/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Wrapper from 'components/Wrapper';
import Container from 'components/Container';
import Element from 'components/Element';
import H2 from 'components/H2';
import H3 from 'components/H3';
import P from 'components/P';

import {
  selectName,
  selectLevel,
  selectReviewCount,
  selectLastWkSyncDate,
} from 'containers/HomePage/selectors';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    // TODO: to handle time information try out https://date-fns.org
    const {
      name,
      level,
      reviewCount,
      lastWkSyncDate,
    } = this.props;

    return (
      <div>
        <Helmet
          title="Dashboard"
          meta={[
            { name: 'description', content: 'Kaniwani Dashboard' },
          ]}
        />
        <Wrapper>
          <Container flexRow justifyContent="space-between">
            <Element>
              <H2>Welcome Back {name}.</H2>
              <P>You are level {level}.</P>
              <P>You have {reviewCount} reviews waiting.</P>
              <P>You last synced with WK on {lastWkSyncDate}.</P>
            </Element>
            <Element>
              <H3>Announcements</H3>
              <P>Announcement 1</P>
              <P>Announcement 2</P>
              <P>Announcement 3</P>
            </Element>
          </Container>
        </Wrapper>
      </div>
    );
  }
}

HomePage.propTypes = {
  name: PropTypes.string,
  level: PropTypes.number,
  reviewCount: PropTypes.number,
  lastWkSyncDate: PropTypes.string,
};

// export function mapDispatchToProps(dispatch) {
//   return {
//     loadUserData: () => dispatch(loadUserData()),
//   };
// }

const mapStateToProps = createStructuredSelector({
  name: selectName(),
  level: selectLevel(),
  reviewCount: selectReviewCount(),
  lastWkSyncDate: selectLastWkSyncDate(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(HomePage);
