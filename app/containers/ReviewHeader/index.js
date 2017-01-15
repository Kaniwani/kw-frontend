import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectPercentCorrect,
  selectPercentComplete,
  selectRemainingCount,
  selectCompleteCount,
} from './selectors';

import StatsWrapper from './StatsWrapper';
import ProgressBar from './ProgressBar';
import ViewSummaryLink from './ViewSummaryLink';
import StatsList from './StatsList';

export class ReviewHeader extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { percentComplete, percentCorrect, reviewsComplete, reviewsRemaining } = this.props;
    return (
      <header>
        <ProgressBar value={percentComplete} />
        <StatsWrapper>
          <ViewSummaryLink />
          <StatsList
            correctness={percentCorrect}
            complete={reviewsComplete}
            remaining={reviewsRemaining}
          />
        </StatsWrapper>
      </header>
    );
  }
}

ReviewHeader.propTypes = {
  percentCorrect: PropTypes.number.isRequired,
  percentComplete: PropTypes.number.isRequired,
  reviewsRemaining: PropTypes.number.isRequired,
  reviewsComplete: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  percentCorrect: selectPercentCorrect,
  percentComplete: selectPercentComplete,
  reviewsRemaining: selectRemainingCount,
  reviewsComplete: selectCompleteCount,
});

export default connect(mapStateToProps)(ReviewHeader);
