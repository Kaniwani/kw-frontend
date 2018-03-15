import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { format } from 'date-fns';

import { DATE_FORMAT } from 'common/constants';
import getSrsRankName from 'common/utils/getSrsRankName';
import getDateInWords from 'common/utils/getDateInWords';
import calculatePercentage from 'common/utils/calculatePercentage';

import { selectReviewById } from 'features/reviews/selectors';

import Element from 'common/components/Element';
import StreakStatus from './StreakStatus';
import Status from './Status';

function getReviewStatusText(hidden, needsReview, nextReviewDate) {
  switch (true) {
    case hidden:
      return 'Suspended';
    case needsReview:
      return 'Now';
    default:
      return getDateInWords(nextReviewDate);
  }
}

VocabStats.propTypes = {
  correct: PropTypes.number.isRequired,
  incorrect: PropTypes.number.isRequired,
  streak: PropTypes.number.isRequired,
  wanikaniStreak: PropTypes.number.isRequired,
  hidden: PropTypes.bool.isRequired,
  needsReview: PropTypes.bool.isRequired,
  critical: PropTypes.bool.isRequired,
  nextReviewDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.oneOf([false]),
  ]).isRequired,
  lastStudied: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.oneOf([false]),
  ]).isRequired,
  unlockDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.oneOf([false]),
  ]).isRequired,
};

export function VocabStats({
  streak,
  wanikaniStreak,
  correct,
  incorrect,
  critical,
  hidden,
  needsReview,
  nextReviewDate,
  lastStudied,
  unlockDate,
}) {
  const kaniwaniBurned = getSrsRankName(streak) === 'BURNED';
  const lastStudiedStatus = kaniwaniBurned
    ? format(lastStudied, DATE_FORMAT)
    : getDateInWords(lastStudied);
  return (
    <Element>
      <StreakStatus category="KW" streak={streak} />
      <StreakStatus category="WK" streak={wanikaniStreak} />
      <Status text="Unlocked" status={format(unlockDate, DATE_FORMAT)} />
      <Status text={kaniwaniBurned ? 'Burned' : 'Last reviewed'} status={lastStudiedStatus} />
      {!kaniwaniBurned &&
        nextReviewDate != null &&
        !!streak && (
          <Status
            text="Next review"
            status={getReviewStatusText(hidden, needsReview, nextReviewDate)}
          />
        )}
      <Status text="Correct" status={correct} />
      <Status text="Incorrect" status={incorrect} />
      {!!streak && (
        <Status
          text="Accuracy"
          status={`${calculatePercentage(correct, correct + incorrect)}%` || 'N/A'}
        />
      )}
      {!kaniwaniBurned && <Status text="Critical" status={critical ? 'Yes' : 'Nope!'} />}
    </Element>
  );
}

const mapStateToProps = (state, props) => ({
  ...selectReviewById(state, props),
});

export default connect(mapStateToProps)(VocabStats);
