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

VocabEntryDetail.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.number.isRequired,
    notes: PropTypes.string.isRequired,
    synonyms: PropTypes.array.isRequired,
    vocabulary: PropTypes.object.isRequired,
    isReviewReady: PropTypes.bool.isRequired,
    lastReviewDate: PropTypes.instanceOf(Date).isRequired,
    unlockDate: PropTypes.instanceOf(Date).isRequired,
    nextReviewDate: PropTypes.instanceOf(Date).isRequired,
    isHidden: PropTypes.bool.isRequired,
    isCritical: PropTypes.bool.isRequired,
    isBurned: PropTypes.bool.isRequired,
    correct: PropTypes.number.isRequired,
    incorrect: PropTypes.number.isRequired,
    streak: PropTypes.number.isRequired,
    wk: PropTypes.shape({
      isBurned: PropTypes.bool.isRequired,
      streakName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
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
      <P><code>review.isReviewReady && </code> <ReviewReady>Ready for review</ReviewReady></P>
      <P><code>review.isBurned && </code> <Burned>Burned on KW!</Burned></P>
      <P><code>review.wk.isBurned &&</code> <Burned>Burned on WK!</Burned></P>
      <P><code>review.isCritical &&</code> <Critical>Critical on KW!</Critical></P>
      <P><code>review.streak name: </code> KW {getSrsRankName(review.streak)} <StreakIcon streakName={getSrsRankName(review.streak)} size="2em" /></P>
      <P><code>review.streakName: </code> WK {review.wk && review.wk.streakName} <StreakIcon streakName={review.wk && review.wk.streakName} size="2em" /></P>
      <P><code>review.lastReviewDate: </code> <BoldH>{getDateInWords(review.lastReviewDate)}</BoldH></P>
      <P><code>review.unlockDate: </code> <BoldH>{getDateInWords(review.unlockDate)}</BoldH></P>
      <P><code>review.nextReviewDate: </code> <BoldH>{getDateInWords(review.nextReviewDate)}</BoldH></P>
      <P><code>review.correct</code>:<BoldH> 1</BoldH></P>
      <P><code>review.incorrect</code>:<BoldH> 3</BoldH></P>
      <P><code>correctness(correct, incorrect)</code> <BoldH>{correctness(2, 4)}</BoldH></P>
      <P><BoldH>or if</BoldH> <code>correctness(0, 0)</code> <BoldH>{correctness(0, 0)}</BoldH></P>
      <P>
        <code>review.notes && </code>
        <BoldH>“This item has user notes on KW like this.
          Probably just a single text string that is limited to 500 chars or so.”</BoldH>
      </P>
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
