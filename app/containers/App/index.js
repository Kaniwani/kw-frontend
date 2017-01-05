/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

// import Modal from 'containers/Modal';
import SiteHeader from 'containers/SiteHeader';
import LoadingIndicator from 'components/LoadingIndicator';
import { selectLoading, selectError, selectIsSyncNeeded } from 'containers/App/selectors';
import { loadUserData } from 'containers/App/actions';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0 auto;
  min-height: 100%;
`;

class App extends React.PureComponent {
  componentDidMount() {
    console.log('syncNeeded', this.props.syncNeeded);
    // FIXME: move loading to occur on take('LOAD_STORAGE')
    if (this.props.syncNeeded) {
      this.props.loadUserData();
    }
  }

  render() {
    let appContent = null;
    const isReviewRoute = /review/.test(this.props.router.getCurrentLocation().pathname);

    // Show a loading indicator when we're loading
    if (this.props.loading) {
      appContent = (<LoadingIndicator />);

    // Show an error if there is one
    } else if (this.props.error !== false) {
      const ErrorComponent = () => (
        <p>Something went wrong, please try again!</p>
      );
      appContent = (<ErrorComponent />);
    } else {
      // If we're not loading, and don't have an error, render children
      appContent = React.Children.toArray(this.props.children);
    }

    return (
      <AppWrapper>
        <Helmet
          titleTemplate="%s - Kaniwani"
          defaultTitle="Kaniwani"
          meta={[
            { name: 'description', content: 'Kaniwani, An English to Japanese SRS Quiz' },
          ]}
        />

        {/* <Modal /> */}
        {!isReviewRoute && <SiteHeader />}
        {appContent}

      </AppWrapper>
    );
  }
}

App.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  children: PropTypes.node,
  loadUserData: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
  syncNeeded: PropTypes.bool,
};

export function mapDispatchToProps(dispatch) {
  return {
    loadUserData: () => dispatch(loadUserData()),
  };
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  error: selectError(),
  syncNeeded: selectIsSyncNeeded(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(App);
