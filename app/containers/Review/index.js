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

import LoadingIndicator from 'components/LoadingIndicator';
import ReviewHeader from 'components/ReviewHeader';
import ReviewQuestion from 'components/ReviewQuestion';
import ReviewAnswer from 'components/ReviewAnswer';
import ReviewFooter from 'components/ReviewFooter';

import {
  loadReviewData,
  setNewCurrent,
  returnCurrentToQueue,
} from './actions';
import {
 selectReviews,
 selectCurrentReview,
 selectCompletedCount,
 selectTotal,
 selectProgress,
 selectLoading,
 selectError,
} from './selectors';

const Wrapper = styled.section`
  display: table;
  padding: 0;
  width: 100%;
  height: 100vh;
`;

const Button = styled.button`
  border: 2px solid blue;
  border-radius: 5px;
  font-size: 2em;
  margin: .3rem auto;
  cursor: pointer;
`;

export class Review extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.loadReviewData();
  }

  render() {
    let mainContent = null;
    const {
      error,
      loading,
      current,
      completed,
      total,
      progress,
      returnCurrent,
      newCurrent,
    } = this.props;
    // Show a loading indicator when we're loading
    if (loading) {
      mainContent = (<LoadingIndicator />);

    // Show an error if there is one
    } else if (error !== false) {
      mainContent = (<p>Something went wrong, please try again!</p>);

    // If we're not loading, don't have an error and there is review data, show the review data
    } else if (current.id !== null) {
      mainContent = (
        <Wrapper>
          <Helmet
            title="Review"
            meta={[
              { name: 'description', content: 'Kaniwani Reviews Page' },
            ]}
          />
          <ReviewHeader
            completed={completed}
            correct={progress.correct}
            total={total}
          />
          <ReviewQuestion
            meaning={current.vocabulary.meaning}
          />
          <ReviewAnswer
            streak={current.streak}
            onSubmitAnswer={newCurrent}
          />
          <Button type="button" onClick={returnCurrent}>
            Return current to queue
          </Button>
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
  ]).isRequired,
  current: React.PropTypes.object.isRequired,
  total: React.PropTypes.number.isRequired,
  progress: React.PropTypes.object.isRequired,
  completed: React.PropTypes.number.isRequired,
  returnCurrent: React.PropTypes.func.isRequired,
  newCurrent: React.PropTypes.func.isRequired,
  loadReviewData: React.PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  error: selectError(),
  reviews: selectReviews(),
  current: selectCurrentReview(),
  total: selectTotal(),
  completed: selectCompletedCount(),
  progress: selectProgress(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadReviewData: () => dispatch(loadReviewData()),
    newCurrent: () => dispatch(setNewCurrent()),
    returnCurrent: () => dispatch(returnCurrentToQueue()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Review);
