/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Header from 'components/Header';
import Footer from 'components/Footer';
import H2 from 'components/H2';
import CenteredSection from './CenteredSection';
import Section from './Section';
import {
  selectName,
  selectLevel,
  selectReviewCount,
  selectLastWkSyncDate,
} from 'containers/HomePage/selectors';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    // TODO: to handle time information try out https://date-fns.org
    // TODO: for tooltips try out https://github.com/egoens/react-aria-tooltip

    const {
      name,
      level,
      reviewCount,
      lastWkSyncDate,
    } = this.props;

    return (
      <div>
        <Header />
        <Helmet
          title="Dashboard"
          meta={[
            { name: 'description', content: 'Kaniwani Dashboard' },
          ]}
        />
        <CenteredSection>
          <H2>
            Kaniwani
          </H2>
          <p>
            Version 2.0
          </p>
        </CenteredSection>
        <Section>
          <H2>Welcome Back {name}.</H2>
          <p>You are level {level}.</p>
          <p>You have {reviewCount} reviews waiting.</p>
          <p>You last synced with WK on {lastWkSyncDate}.</p>
        </Section>
        <Footer />
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
