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

import SiteHeader from 'containers/SiteHeader';
import LoadingIndicator from 'components/LoadingIndicator';
import { selectLoading, selectError } from 'containers/App/selectors';


import Container from 'components/Container';
import Element from 'components/Element';
import P from 'components/P';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0 auto;
  min-height: 100%;
`;

// FIXME: find/replace all React.Component with React.PureComponent for production!
export class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool,
    ]),
    children: PropTypes.node,
    router: PropTypes.object.isRequired,
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
        <Container>
          <Element>
            <P>Something went wrong, please try again!</P>
          </Element>
        </Container>
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

        {!isReviewRoute && <SiteHeader />}
        {appContent}

      </AppWrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  error: selectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(App);
