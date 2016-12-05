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
import CenteredSection from './CenteredSection';
import Section from './Section';
import H2 from 'components/H2';
import LoadingIndicator from 'components/LoadingIndicator';
import { loadUserData } from '../App/actions';
import { selectUser, selectLoading, selectError } from 'containers/App/selectors';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    // TODO: load in app rather than homepage, since other routes need access to user data
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

    // If we're not loading, don't have an error and if there is userData, show the userData
    } else if (this.props.user) {
      const {
        name,
        reviewCount,
        lastWkSyncDate,
        level,
      } = this.props.user.toJS();

      mainContent = (
        <div>
          <H2>Welcome Back {name}.</H2>
          <p>You are level {level}.</p>
          <p>You have {reviewCount} reviews waiting.</p>
          <p>You last synced with WK on {lastWkSyncDate.toDateString()}.</p>
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
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  user: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  loadUserData: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    loadUserData: () => dispatch(loadUserData()),
  };
}

const mapStateToProps = createStructuredSelector({
  user: selectUser(),
  loading: selectLoading(),
  error: selectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
