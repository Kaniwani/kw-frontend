import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectPercentCorrect,
  selectPercentCompleted,
  selectReviewsRemaining,
  selectCompletedCount,
} from './selectors';

import Wrapper from './Wrapper';
import ProgressBar from './ProgressBar';
import ViewSummaryLink from './ViewSummaryLink';
import StatsList from './StatsList';

export class ReviewHeader extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Wrapper>
        <ProgressBar value={this.props.percentCompleted} />
        <ViewSummaryLink />
        <StatsList
          correctness={this.props.percentCorrect}
          completed={this.props.reviewsCompleted}
          remaining={this.props.reviewsRemaining}
        />
      </Wrapper>
    );
  }
}

ReviewHeader.propTypes = {
  percentCorrect: PropTypes.number,
  percentCompleted: PropTypes.number,
  reviewsRemaining: PropTypes.number,
  reviewsCompleted: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  percentCorrect: selectPercentCorrect(),
  percentCompleted: selectPercentCompleted(),
  reviewsRemaining: selectReviewsRemaining(),
  reviewsCompleted: selectCompletedCount(),
});

export default connect(mapStateToProps)(ReviewHeader);
