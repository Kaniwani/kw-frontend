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
import ReviewHeader from 'components/ReviewHeader';
import ReviewQuestion from 'components/ReviewQuestion';
import ReviewAnswer from 'components/ReviewAnswer';
import ReviewFooter from 'components/ReviewFooter';

import { loadReviewData, rotateCurrentReview } from './actions';
import { selectReviews, selectCurrentReview, selectProgress, selectLoading, selectError } from './selectors';

const Wrapper = styled.section`
  display: table;
  padding: 0;
  width: 100%;
  height: 100vh;
`;

// const RotateButton = styled.button`
//   border: 2px solid blue;
//   border-radius: 5px;
//   font-size: 2em;
//   margin: .3rem auto;
//   cursor: pointer;
// `;

export class Review extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.loadReviewData();
  }

  render() {
    let mainContent = null;
    const { error, loading, reviews, current, progress, rotateReview } = this.props;

    // Show a loading indicator when we're loading
    if (loading) {
      mainContent = (<LoadingIndicator />);

    // Show an error if there is one
    } else if (error !== false) {
      mainContent = (<p>Something went wrong, please try again!</p>);

    // If we're not loading, don't have an error and there is review data, show the review data
    } else if (reviews !== false) {
      mainContent = (
        <Wrapper>
          <ReviewHeader progress={progress} />
          <ReviewQuestion question={current ? current.meaning : '無'} />
          <ReviewAnswer />
{/*          <RotateButton type="button" onClick={rotateReview}>
            Rotate
          </RotateButton>*/}
          <ReviewFooter />
        </Wrapper>
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
  progress: React.PropTypes.object.isRequired,
  rotateReview: React.PropTypes.func.isRequired,
  loadReviewData: React.PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  error: selectError(),
  reviews: selectReviews(),
  current: selectCurrentReview(),
  progress: selectProgress(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadReviewData: () => dispatch(loadReviewData()),
    rotateReview: () => dispatch(rotateCurrentReview()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Review);
