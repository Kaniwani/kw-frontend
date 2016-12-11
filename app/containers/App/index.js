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

import LoadingIndicator from 'components/LoadingIndicator';
import Modal from 'containers/Modal';
import { selectLoading, selectError } from 'containers/App/selectors';
import { loadUserData } from 'containers/App/actions';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0 auto;
  min-height: 100%;
`;

class App extends React.PureComponent {
  componentWillMount() {
    this.props.loadUserData();
  }

  render() {
    let appContent = null;

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
      appContent = React.Children.toArray(this.props.children);
    }

    // If we're not loading, and don't have an error, render children

    return (
      <AppWrapper>
        <Helmet
          titleTemplate="%s - Kaniwani"
          defaultTitle="Kaniwani"
          meta={[
            { name: 'description', content: 'Kaniwani, An English to Japanese SRS Quiz' },
          ]}
        />

        <Modal />
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
};

export function mapDispatchToProps(dispatch) {
  return {
    loadUserData: () => dispatch(loadUserData()),
  };
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  error: selectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(App);
