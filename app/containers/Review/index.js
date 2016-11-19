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
  moveCurrentToCompleted,
  returnCurrentToQueue,
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

const Button = styled.button`
  border: 2px solid blue;
  border-radius: 5px;
  font-size: 2em;
  margin: .3rem auto;
  cursor: pointer;
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
      onButtonClick,
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
          onSubmit={onSubmitAnswer}
          streak={streak}
        />
        <Button type="button" onClick={onButtonClick}>
          Return current to queue
        </Button>
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
  onButtonClick: React.PropTypes.func.isRequired,
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
    onSubmitAnswer: () => dispatch(moveCurrentToCompleted()),
    onButtonClick: () => dispatch(returnCurrentToQueue()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Review);
