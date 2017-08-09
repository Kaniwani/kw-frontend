import React from 'react';
import PropTypes from 'prop-types';
import getDateInWords from 'utils/getDateInWords';

import P from 'base/P';
import Element from 'base/Element';

ReviewStatus.propTypes = {
  isHidden: PropTypes.bool,
  isReviewReady: PropTypes.bool,
  nextReviewDate: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.instanceOf(Date),
  ]),
};

ReviewStatus.defaultProps = {
  isHidden: false,
  isReviewReady: false,
  nextReviewDate: false,
};

function ReviewStatus({ isHidden, isReviewReady, nextReviewDate }) {
  let status = 'N/A';
  if (isHidden) { status = 'Hidden'; }
  if (isReviewReady) { status = 'Now'; }
  if (nextReviewDate) { status = getDateInWords(nextReviewDate); }
  return (
    <Element style={{ flex: '1 1 100%' }}>
      <P><b>Next review: </b>{status}</P>
    </Element>
  );
}

export default ReviewStatus;
