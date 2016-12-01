/*
 *
 * Review
 *
 */

import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import ReviewHeader from 'containers/ReviewHeader';
import ReviewAnswer from 'containers/ReviewAnswer';
import ReviewQuestion from 'components/ReviewQuestion';
import ReviewInfo from 'components/ReviewInfo';
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
    const { error, loading, meaning } = this.props;
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
        <ReviewInfo />
        <ReviewFooter />
      </Wrapper>
    );
  }
}

Review.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  meaning: PropTypes.string,
  loadReviewData: PropTypes.func.isRequired,
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
