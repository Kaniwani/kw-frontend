import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';

// import {
//   selectPercentCorrect,
//   selectPercentComplete,
//   selectRemainingCount,
//   selectCompleteCount,
// } from './selectors';

import { Wrapper } from './styles';
import ProgressBar from './ProgressBar';
import ViewSummaryLink from './ViewSummaryLink';
import StatsList from './StatsList';

ReviewHeader.propTypes = {
  percentCorrect: PropTypes.number,
  percentComplete: PropTypes.number,
  reviewsRemaining: PropTypes.number,
  reviewsComplete: PropTypes.number,
};

ReviewHeader.defaultProps = {
  percentCorrect: 0,
  percentComplete: 0,
  reviewsRemaining: 0,
  reviewsComplete: 0,
};

function ReviewHeader({
  percentComplete,
  percentCorrect,
  reviewsComplete,
  reviewsRemaining,
}) {
  return (
    <div>
      <ProgressBar value={percentComplete} />
      <Wrapper>
        <ViewSummaryLink />
        <StatsList
          correctness={percentCorrect}
          complete={reviewsComplete}
          remaining={reviewsRemaining}
        />
      </Wrapper>
    </div>
  );
}

// const mapStateToProps = createStructuredSelector({
//   percentCorrect: selectPercentCorrect,
//   percentComplete: selectPercentComplete,
//   reviewsRemaining: selectRemainingCount,
//   reviewsComplete: selectCompleteCount,
// });

export default /* connect(mapStateToProps)(*/ReviewHeader/* )*/;
