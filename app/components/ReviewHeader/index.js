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
  category: PropTypes.string.isRequired,
  complete: PropTypes.number.isRequired,
  remaining: PropTypes.number.isRequired,
  percentCorrect: PropTypes.number.isRequired,
  percentComplete: PropTypes.number.isRequired,
};

function ReviewHeader({
  category,
  complete,
  remaining,
  percentComplete,
  percentCorrect,
}) {
  return (
    <div>
      <ProgressBar value={percentComplete} />
      <Wrapper>
        <ViewSummaryLink category={category} />
        <StatsList
          correctness={percentCorrect}
          complete={complete}
          remaining={remaining}
        />
      </Wrapper>
    </div>
  );
}

export default ReviewHeader;
