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
import ReviewHeader from 'components/ReviewHeader';
import ReviewQuestion from 'components/ReviewQuestion';
import ReviewAnswer from 'components/ReviewAnswer';
import ReviewFooter from 'components/ReviewFooter';
import {
  loadReviewData,
  markCorrect,
  markIncorrect,
  markIgnored,
} from './actions';
import {
 selectCurrentMeaning,
 selectCurrentStreak,
 selectCompletedCount,
 selectCorrectCount,
 selectTotalCount,
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
      streak,
      correctCount,
      totalCount,
      completedCount,
      onIgnoreButton,
      onSubmitAnswer,
    } = this.props;

    return (
      <Wrapper>
        <Helmet
          title="Review"
          meta={[
            { name: 'description', content: 'Kaniwani Reviews Page' },
          ]}
        />
        <ReviewHeader
          completed={completedCount}
          correct={correctCount}
          total={totalCount}
        />
        <ReviewQuestion
          loading={loading}
          error={error}
          meaning={meaning}
        />
        <ReviewAnswer
          checkAnswer={onSubmitAnswer}
          ignoreAnswer={onIgnoreButton}
          streak={streak}
        />
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
  streak: React.PropTypes.number,
  correctCount: React.PropTypes.number,
  totalCount: React.PropTypes.number,
  completedCount: React.PropTypes.number,
  // dispatch actions
  onIgnoreButton: React.PropTypes.func.isRequired,
  onSubmitAnswer: React.PropTypes.func.isRequired,
  loadReviewData: React.PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  error: selectError(),
  meaning: selectCurrentMeaning(),
  streak: selectCurrentStreak(),
  correctCount: selectCorrectCount(),
  totalCount: selectTotalCount(),
  completedCount: selectCompletedCount(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadReviewData: () => dispatch(loadReviewData()),
    onSubmitAnswer: () => dispatch(
      // TODO: checkAnswer()
      Math.random() * 10 > 4 ? markCorrect() : markIncorrect()
    ),
    onIgnoreButton: () => dispatch(markIgnored()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Review);
