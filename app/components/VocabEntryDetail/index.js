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

const Burned = H3.extend`
  display: inline-block;
  color: tomato;
`;

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
  // FIXME: don't pass review down! pass ID and let the components select only what they need for re-rendering
  return (
    <div>
      <P>{review.isReviewReady && <ReviewReady>Ready for review</ReviewReady> }</P>
      <P>{review.isBurned && <Burned>Burned on KW!</Burned>}</P>
      <P>{review.wk.isBurned && <Burned>Burned on WK!</Burned>}</P>
      <P>{review.isCritical && <Critical>Critical on KW!</Critical>}</P>
      <P>KW {getSrsRankName(review.streak)} <StreakIcon streakName={getSrsRankName(review.streak)} size="2em" /></P>
      <P>WK {review.wk && review.wk.streakName} <StreakIcon streakName={review.wk && review.wk.streakName} size="2em" /></P>
      <P>Unlocked on <BoldH>{getDateInWords(review.unlockDate)}</BoldH></P>
      <P>Last reviewed on <BoldH>{getDateInWords(review.lastReviewDate)}</BoldH></P>
      <P>Next upcoming review <BoldH>{getDateInWords(review.nextReviewDate)}</BoldH></P>
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
