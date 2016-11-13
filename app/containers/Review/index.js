/*
 *
 * Review
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import LoadingIndicator from 'components/LoadingIndicator';
import ReviewQuestion from 'components/ReviewQuestion';
import ReviewAnswer from 'components/ReviewAnswer';

import { loadReviewData, rotateCurrentReview } from './actions';
import { selectReviewData, selectCurrentReview, selectLoading, selectError } from './selectors';

const QnA = styled.section`
  display: table;
  padding: 0;
  width: 100%;
`;

export class Review extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.dispatch(loadReviewData());
    setTimeout(() => this.props.dispatch(rotateCurrentReview()), 500);
  }

  render() {
    let mainContent = null;
    const { error, loading, reviews, current } = this.props;

    // Show a loading indicator when we're loading
    if (loading) {
      mainContent = (<LoadingIndicator />);

    // Show an error if there is one
    } else if (error !== false) {
      mainContent = (<p>Something went wrong, please try again!</p>);

    // If we're not loading, don't have an error and there is review data, show the review data
    } else if (reviews !== false) {
      mainContent = (
        <QnA>
          <ReviewQuestion question={current.meaning && current.meaning || 'derp'} />
          <ReviewAnswer />
        </QnA>
      );
    }

    return mainContent;
  }
}

Review.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  reviews: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  current: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  dispatch: React.PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  reviews: selectReviewData(),
  loading: selectLoading(),
  error: selectError(),
  current: selectCurrentReview(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Review);
