import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { compose, withHandlers, branch, renderNothing, renderComponent } from 'recompose';
import titleCase from 'voca/title_case';
import getDateInWords from 'utils/getDateInWords';
import calculatePercentage from 'utils/calculatePercentage';
import { createStructuredSelector } from 'reselect';

import actions from 'containers/App/actions';
import { selectReview, selectReviewMeanings, selectReviewReadings } from 'containers/App/selectors';

import H1 from 'base/H1';
import H3 from 'base/H3';
import Container from 'base/Container';
import Element from 'base/Element';
import P from 'base/P';
import LockButton from 'components/LockButton';
import LoadingIndicator from 'components/LoadingIndicator';
import Button from 'base/Button';
import ReadingHeader from 'components/ReadingHeader';
import SynonymHeader from 'components/SynonymHeader';
import SentencePair from 'components/SentencePair';
import StreakIcon from 'components/StreakIcon';
import TagsList from 'components/TagsList';
// import PitchInfo from 'components/PitchInfo';
// import KanjiStroke from 'components/KanjiStroke';

const Reading = ({ kana, character }) => (
  <Container>
    <H1>{character}</H1>
    <P>{kana.join('・')}</P>
  </Container>
);
Reading.propTypes = {
  kana: PropTypes.array.isRequired,
  character: PropTypes.string.isRequired,
};

const Readings = connect(createStructuredSelector({
  readings: selectReviewReadings,
}))(({ readings, id }) => (
  <div>
    {readings.map((reading) => (
      <div key={uuid()} >
        <ReadingHeader
          id={id}
          character={reading.character}
          tags={reading.tags}
          withKwLink={false}
        />
        <Element>
          <TagsList tags={reading.tags} />
        </Element>
        <Reading character={reading.character} kana={reading.kana} />
        <SentencePair reading={reading} />
        {/* <PitchInfo character={reading.character} /> */}
        {/* <KanjiStroke character={reading.character} /> */}
      </div>
    ))}
  </div>
));
Readings.propTypes = {
  readings: PropTypes.array,
  id: PropTypes.number.isRequired,
};

const Bordered = P.extend` border: 1px solid blue; `;
const Synonyms = ({ synonyms, handleAddSynonym }) => (
  <div>
    <Bordered >
      This will have kanji/kana input boxes etc
      <Button onClick={handleAddSynonym}>Add Synonym</Button>
    </Bordered>
    <Container flexRow>
      { synonyms.map(({ reviewId, id, character, kana }) => (
        <Element key={uuid()}>
          <SynonymHeader key={uuid()} id={id} reviewId={reviewId} />
          <Reading character={character} kana={[kana]} />
        </Element>
    ))}
    </Container>
  </div>
);
Synonyms.propTypes = {
  synonyms: PropTypes.array,
  handleAddSynonym: PropTypes.func.isRequired,
};
const enhanceSynonyms = compose(
  branch(({ synonyms }) => synonyms.length < 0, renderNothing),
  connect(null, (dispatch) => ({
    addSynonym: (payload) => dispatch(actions.synonym.add.request(payload)),
  })),
  withHandlers({
    handleAddSynonym: ({ id, addSynonym }) => () =>
      addSynonym({ reviewId: id, character: '漢字', kana: 'かな' }),
  })
);
const EnhancedSynonyms = enhanceSynonyms(Synonyms);


const Meanings = connect(createStructuredSelector({
  meanings: selectReviewMeanings,
}))(({ meanings }) => {
  const [first, ...rest] = meanings;
  return (
    <Container>
      <H1>{titleCase(first)}</H1>
      {rest.length > 0 && <P>{titleCase(rest.join(', '))}</P>}
    </Container>
  );
});
Meanings.propTypes = {
  meanings: PropTypes.array,
  id: PropTypes.number.isRequired,
};


const enhance = compose(
  branch(({ review }) => !review, renderComponent(LoadingIndicator)),
  withHandlers({
    handleLockClick: ({ review: { id, isHidden }, lockReview, unlockReview }) => () =>
      isHidden ? unlockReview({ id }) : lockReview({ id }),
  }),
);

VocabEntryDetail.propTypes = {
  handleLockClick: PropTypes.func.isRequired,
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
    streakName: PropTypes.string.isRequired,
    wk: PropTypes.shape({
      isBurned: PropTypes.bool.isRequired,
      streak: PropTypes.number.isRequired,
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

function VocabEntryDetail({ review, handleLockClick }) {
  // FIXME: don't pass review down! pass ID and let the components select only what they need for re-rendering
  return (
    <div>
      <Meanings id={review.id} />
      <Container>
        <Element>
          {review.isHidden ? 'Locked ' : 'Unlocked '}
          <LockButton
            inline
            id={review.id}
            isLocked={review.isHidden}
            handleClick={handleLockClick}
          />
        </Element>
      </Container>
      <Readings id={review.id} />
      <EnhancedSynonyms id={review.id} synonyms={review.synonyms} />
      <P><code>review.isReviewReady && </code> <ReviewReady>Ready for review</ReviewReady></P>
      <P><code>review.isBurned && </code> <Burned>Burned on KW!</Burned></P>
      <P><code>review.wk.isBurned &&</code> <Burned>Burned on WK!</Burned></P>
      <P><code>review.isCritical &&</code> <Critical>Critical on KW!</Critical></P>
      <P><code>review.streakName: </code> KW {review.streakName} <StreakIcon streakName={review.streakName} size="2em" /></P>
      <P><code>review.streakName: </code> WK {review.wk.streakName} <StreakIcon streakName={review.wk.streakName} size="2em" /></P>
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

const mapStateToProps = createStructuredSelector({
  review: selectReview,
});

const mapDispatchToProps = (dispatch) => ({
  lockReview: (payload) => dispatch(actions.review.lock.request(payload)),
  unlockReview: (payload) => dispatch(actions.review.unlock.request(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(enhance(VocabEntryDetail));
