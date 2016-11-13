/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Header from 'components/Header';
import Footer from 'components/Footer';
import CenteredSection from './CenteredSection';
import H2 from 'components/H2';
import Section from './Section';
import LoadingIndicator from 'components/LoadingIndicator';
import { loadUserData } from '../App/actions';
import { selectUserData, selectLoading, selectError } from 'containers/App/selectors';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.loadUserData();
  }
  render() {
    let mainContent = null;

    // Show a loading indicator when we're loading
    if (this.props.loading) {
      mainContent = (<LoadingIndicator />);

    // Show an error if there is one
    } else if (this.props.error !== false) {
      const ErrorComponent = () => (
        <p>Something went wrong, please try again!</p>
      );
      mainContent = (<ErrorComponent />);

    // If we're not loading, don't have an error and there are userData, show the userData
    } else if (this.props.user !== false) {
      const {
        name,
        reviewCount,
        lastWKSyncDate,
        level,
      } = this.props.user;
      mainContent = (
        <div>
          <H2>Welcome Back {name}.</H2>
          <p>You are level {level}.</p>
          <p>You have {reviewCount} reviews waiting.</p>
          <p>You last synced with WK on {lastWKSyncDate}.</p>
        </div>
      );
    }

    return (
      <div>
        <Header />
        <Helmet
          title="Home"
          meta={[
            { name: 'description', content: 'Kaniwani Home Page' },
          ]}
        />
        <div>
          <CenteredSection>
            <H2>
              Kaniwani
            </H2>
            <p>
              Version 2.0
            </p>
          </CenteredSection>
          <Section>
            {mainContent}
          </Section>
        </div>
        <Footer />
      </div>
    );
  }
}

HomePage.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  user: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  loadUserData: React.PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    loadUserData: () => dispatch(loadUserData()),
  };
}

const mapStateToProps = createStructuredSelector({
  user: selectUserData(),
  loading: selectLoading(),
  error: selectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
