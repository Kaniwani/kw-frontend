/*
 *
 * Review
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import ReviewHeader from 'containers/ReviewHeader';
import ReviewAnswer from 'containers/ReviewAnswer';
import ReviewQuestion from 'components/ReviewQuestion';
import ReviewFooter from 'components/ReviewFooter';

import {
  loadReviewData,
} from './actions';

import {
 selectCurrentMeaning,
 selectLoading,
 selectError,
} from './selectors';

const Wrapper = styled.section`
  display: table;
  padding: 0;
  width: 100%;
  height: 100vh;
`;

export class Review extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.loadReviewData();
  }

  render() {
    const {
      error,
      loading,
      meaning,
    } = this.props;

    return (
      <Wrapper>
        <Helmet
          title="Review"
          meta={[
            { name: 'description', content: 'Kaniwani Reviews Page' },
          ]}
        />
        <ReviewHeader />
        <ReviewQuestion
          loading={loading}
          error={error}
          meaning={meaning}
        />
        <ReviewAnswer />
        <ReviewFooter />
      </Wrapper>
    );
  }
}

Review.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  meaning: React.PropTypes.string,
  loadReviewData: React.PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  error: selectError(),
  meaning: selectCurrentMeaning(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadReviewData: () => dispatch(loadReviewData()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Review);
