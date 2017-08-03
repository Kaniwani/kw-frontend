import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, branch, renderNothing } from 'recompose';

import getDateInWords from 'utils/getDateInWords';
import calculatePercentage from 'utils/calculatePercentage';
import getSrsRankName from 'utils/getSrsRankName';

import { makeSelectReview } from 'containers/App/selectors';

import H3 from 'base/H3';
import P from 'base/P';
import StreakIcon from 'components/StreakIcon';
import VocabEntryNotes from 'components/VocabEntryNotes';

VocabEntryDetail.propTypes = {
  review: PropTypes.object.isRequired,
};

const Critical = H3.extend`
  display: inline-block;
  color: crimson;
`;

const ReviewReady = H3.extend`
  display: inline-block;
  color: blue;
`;

const BoldH = H3.extend`
  display: inline-block;
  color: rebeccaPurple;
`;

const correctness = (correct, incorrect) => {
  const total = correct + incorrect;
  const previouslyAnswered = total > 0;
  return (<span>{previouslyAnswered ? `${calculatePercentage(correct, total)}%` : 'N/A'}</span>);
};

function VocabEntryDetail({ review }) {
  const reviewStatus = (item) => {
    if (item.isHidden) return 'Hidden';
    if (item.isReviewReady) return 'Now';
    if (item.nextReviewDate) return getDateInWords(item.nextReviewDate);
    return 'N/A';
  };
  // FIXME: don't pass review down! pass ID and let the components select only what they need for re-rendering
  return (
    <div>
      <P>KW {getSrsRankName(review.streak)} <StreakIcon streakName={getSrsRankName(review.streak)} size="2em" /></P>
      <P>WK {review.wk && getSrsRankName(review.wk.streak)} <StreakIcon streakName={review.wk && getSrsRankName(review.wk.streak)} size="2em" /></P>
      {<ReviewReady>Next review: {reviewStatus(review)}</ReviewReady> }
      {review.isCritical && <Critical>Critical!</Critical>}
      <P>Unlocked on <BoldH>{getDateInWords(review.unlockDate)}</BoldH></P>
      <P>Last reviewed on <BoldH>{getDateInWords(review.lastReviewDate)}</BoldH></P>
      <P>Times correct: <BoldH>{review.correct}</BoldH></P>
      <P>Times incorrect: <BoldH>{review.incorrect}</BoldH></P>
      <P>Correctness<BoldH>{correctness(review.correct, review.incorrect)}</BoldH></P>
      <VocabEntryNotes id={review.id} />
    </div>
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
