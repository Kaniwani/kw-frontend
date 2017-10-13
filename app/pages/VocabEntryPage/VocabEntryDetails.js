import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, branch, renderNothing } from 'recompose';
import format from 'date-fns/format';

import { makeSelectReview } from 'containers/App/selectors';
import { DATE_FORMAT } from 'shared/constants';
import getDateInWords from 'utils/getDateInWords';
import calculatePercentage from 'utils/calculatePercentage';

import ReviewLock from 'components/ReviewLock';
import StreakStatus from './StreakStatus';
import Status from './Status';

import { ColumnContainer, LockContainer } from './styles';

function getReviewStatusText(isHidden, isReviewReady, nextReviewDate) {
  if (isHidden) { return 'Hidden'; }
  if (isReviewReady) { return 'Now'; }
  if (nextReviewDate) { return getDateInWords(nextReviewDate); }
  return 'N/A';
}

VocabEntryDetails.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.number.isRequired,
    correct: PropTypes.number.isRequired,
    incorrect: PropTypes.number.isRequired,
    streak: PropTypes.number.isRequired,
    wkStreak: PropTypes.number.isRequired,
    isHidden: PropTypes.bool.isRequired,
    isReviewReady: PropTypes.bool.isRequired,
    isCritical: PropTypes.bool.isRequired,
    nextReviewDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.oneOf([false])]).isRequired,
    lastReviewDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.oneOf([false])]).isRequired,
    unlockDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.oneOf([false])]).isRequired,
  }).isRequired,
};

function VocabEntryDetails({ review }) {
  const {
    id,
    streak,
    wkStreak,
    correct,
    incorrect,
    isCritical,
    isHidden,
    isReviewReady,
    nextReviewDate,
    lastReviewDate,
    unlockDate,
  } = review;
  return (
    <ColumnContainer>
      <LockContainer>
        <ReviewLock id={id} />
      </LockContainer>
      <div>
        <StreakStatus category="KW" streak={streak} />
        <StreakStatus category="WK" streak={wkStreak} />
      </div>
      <Status text="Unlocked" status={format(unlockDate, DATE_FORMAT)} />
      <Status text="Last reviewed" status={getDateInWords(lastReviewDate)} />
      <Status text="Next review" status={getReviewStatusText(isHidden, isReviewReady, nextReviewDate)} />
      {/* TODO: horizontal britecharts bar graphs ? */}
      <Status text="Correct" status={correct} />
      <Status text="Incorrect" status={incorrect} />
      <Status text="Accuracy" status={`${calculatePercentage(correct, correct + incorrect)}%` || 'N/A'} />
      <Status text="Critical" status={isCritical ? 'Yes' : 'Nope!'} />
    </ColumnContainer>
  );
}

const mapStateToProps = (state, { id }) => ({
  review: makeSelectReview(id)(state),
});

const enhance = compose(
  connect(mapStateToProps),
  branch(({ review }) => review == null || (review && review.wkStreak == null), renderNothing),
);

export default enhance(VocabEntryDetails);
