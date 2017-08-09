import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, branch, renderNothing } from 'recompose';

import getDateInWords from 'utils/getDateInWords';
import calculatePercentage from 'utils/calculatePercentage';

import { makeSelectReview } from 'containers/App/selectors';

import VocabEntryNotes from 'components/VocabEntryNotes';
import StreakStatus from './StreakStatus';
import Status from './Status';
import CriticalStatus from './CriticalStatus';
import ReviewStatus from './ReviewStatus';
import QuizStatus from './QuizStatus';

import { Wrapper } from './styles';

VocabEntryDetail.propTypes = {
  review: PropTypes.object.isRequired,
};

const correctness = (correct, incorrect) => {
  const total = correct + incorrect;
  const previouslyAnswered = total > 0;
  return previouslyAnswered ? calculatePercentage(correct, total) : 0;
};

function VocabEntryDetail({ review }) {
  return (
    <Wrapper>
      <StreakStatus category="KW" streak={review.streak} />
      <StreakStatus category="WK" streak={review.wkStreak} />
      <Status text="Unlocked" status={getDateInWords(review.unlockDate)} />
      <Status text="Last reviewed" status={getDateInWords(review.lastReviewDate)} />
      <ReviewStatus review={review} />
      <div style={{ display: 'flex', width: '100%' }}>
        <QuizStatus text="Correct" status={review.correct} />
        <QuizStatus text="Incorrect" status={review.incorrect} />
        <QuizStatus text="Correctness" status={correctness(review.correct, review.incorrect) || 'N/A'} />
      </div>
      <CriticalStatus isCritical={review.isCritical} />
      <VocabEntryNotes id={review.id} />
    </Wrapper>
  );
}

const mapStateToProps = (state, { id }) => ({
  review: makeSelectReview(id)(state),
});

const enhance = compose(
  connect(mapStateToProps),
  branch(({ review }) => !review, renderNothing),
);

export default enhance(VocabEntryDetail);
