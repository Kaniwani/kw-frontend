import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, branch, renderNothing } from 'recompose';

import nullable from 'utils/propNullable';
import getDateInWords from 'utils/getDateInWords';
import calculatePercentage from 'utils/calculatePercentage';

import StreakStatus from 'components/VocabEntryDetail/StreakStatus';
import Status from 'components/VocabEntryDetail/Status';
import ReviewLock from 'components/ReviewLock';

import { makeSelectReview } from 'containers/App/selectors';

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
    nextReviewDate: nullable(PropTypes.instanceOf(Date)).isRequired,
    lastReviewDate: nullable(PropTypes.instanceOf(Date)).isRequired,
    unlockDate: nullable(PropTypes.instanceOf(Date)).isRequired,
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
      <Status text="Next review" status={getReviewStatusText(isHidden, isReviewReady, nextReviewDate)} />
      <Status text="Last reviewed" status={getDateInWords(lastReviewDate)} />
      <Status text="Unlocked" status={getDateInWords(unlockDate)} />
      {/* TODO: horizontal britecharts bar graphs */}
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
