import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectPercentCorrect,
  selectPercentCompleted,
  selectReviewsRemaining,
  selectCompletedCount,
} from './selectors';

import StatsWrapper from './StatsWrapper';
import ProgressBar from './ProgressBar';
import ViewSummaryLink from './ViewSummaryLink';
import StatsList from './StatsList';

export class ReviewHeader extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { percentCompleted, percentCorrect, reviewsCompleted, reviewsRemaining } = this.props;
    return (
      <div>
        <ProgressBar value={percentCompleted} />
        <StatsWrapper>
          <ViewSummaryLink />
          <StatsList
            correctness={percentCorrect}
            completed={reviewsCompleted}
            remaining={reviewsRemaining}
          />
        </StatsWrapper>
      </div>
    );
  }
}

ReviewHeader.propTypes = {
  percentCorrect: PropTypes.number.isRequired,
  percentCompleted: PropTypes.number.isRequired,
  reviewsRemaining: PropTypes.number.isRequired,
  reviewsCompleted: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  percentCorrect: selectPercentCorrect(),
  percentCompleted: selectPercentCompleted(),
  reviewsRemaining: selectReviewsRemaining(),
  reviewsCompleted: selectCompletedCount(),
});

export default connect(mapStateToProps)(ReviewHeader);
