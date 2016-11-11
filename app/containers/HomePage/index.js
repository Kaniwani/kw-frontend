/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CenteredSection from './CenteredSection';
import H2 from 'components/H2';
import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import Section from './Section';
import { loadUserData } from '../App/actions';
import { selectUserData, selectLoading, selectError } from 'containers/App/selectors';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
   render() {
    let mainContent = null;

    // Show a loading indicator when we're loading
    if (this.props.loading) {
      mainContent = (<List component={LoadingIndicator} />);

    // Show an error if there is one
    } else if (this.props.error !== false) {
      const ErrorComponent = () => (
        <ListItem item={'Something went wrong, please try again!'} />
      );
      mainContent = (<List component={ErrorComponent} />);

    // If we're not loading, don't have an error and there are repos, show the repos
    } else if (this.props.userData !== false) {
      mainContent = (<List items={this.props.userData} component={ListItem} />);
    }

    return (
      <article>
        <Helmet
          title="Dashboard"
          meta={[
            { name: 'description', content: 'Kaniwani Dashboard' },
          ]}
        />
        <div>
          <CenteredSection>
            <H2>
              Welcome to Kaniwani
            </H2>
            <p>
              Version 2.0
            </p>
          </CenteredSection>
          <Section>
            <H2>
              User data:
            </H2>
            <Button onClick={this.props.onClick}>
              Load data
            </Button>
            {mainContent}
          </Section>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  userData: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  onClick: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onClick: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadUserData());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  userData: selectUserData(),
  loading: selectLoading(),
  error: selectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
