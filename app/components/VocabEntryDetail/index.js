import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { compose, withHandlers, branch, renderNothing } from 'recompose';
import titleCase from 'voca/title_case';
import getDateInWords from 'utils/getDateInWords';

import app from 'containers/App/actions';

import H1 from 'base/H1';
import P from 'base/P';
import Ul from 'base/Ul';
import LockButton from 'components/LockButton';
import Button from 'base/Button';
import Container from 'base/Container';
import ReadingHeader from 'components/ReadingHeader';
import SynonymHeader from 'components/SynonymHeader';
import SentencePair from 'components/SentencePair';
import KanjiStroke from 'components/KanjiStroke';


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

const Readings = ({ review }) => (
  <Ul plainList >
    {review.readings.map((reading) => (
      <li key={uuid()} >
        <ReadingHeader
          id={review.id}
          character={reading.character}
          tags={reading.tags}
          withKwLink={false}
        />
        <Reading character={reading.character} kana={reading.kana} />
        <SentencePair reading={reading} />
        {/* <KanjiStroke character={reading.character} /> */}
      </li>
    ))}
  </Ul>
);
Readings.propTypes = {
  review: PropTypes.object.isRequired,
};

const Synonyms = ({ synonyms, handleAddSynonym }) => (
  <div>
    <Button onClick={handleAddSynonym}>Add Synonym</Button>
    <Ul plainList >
      { synonyms.map(({ reviewId, id, character, kana }) => (
        <li key={uuid()}>
          <SynonymHeader key={uuid()} id={id} reviewId={reviewId} />
          <Reading character={character} kana={[kana]} />
        </li>
    ))}
    </Ul>
  </div>
);
Synonyms.propTypes = {
  handleAddSynonym: PropTypes.func.isRequired,
  synonyms: PropTypes.array.isRequired,
};
const enhanceSynonyms = compose(
  branch(({ synonyms }) => synonyms.length < 0, renderNothing),
  connect(null, (dispatch) => ({
    addSynonym: (payload) => dispatch(app.review.synonym.add.request(payload)),
  })),
  withHandlers({
    handleAddSynonym: ({ reviewId, addSynonym }) => () =>
      addSynonym({ reviewId, character: '漢字', kana: 'かな' }),
  })
);
const EnhancedSynonyms = enhanceSynonyms(Synonyms);


const Meaning = ({ review }) => {
  const [first, ...rest] = review.meanings;
  return (
    <Container>
      <H1>{titleCase(first)}</H1>
      <P>{titleCase(rest.join(', '))}</P>
    </Container>
  );
};
Meaning.propTypes = {
  review: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  lockReview: (payload) => dispatch(app.review.lock.request(payload)),
  unlockReview: (payload) => dispatch(app.review.unlock.request(payload)),
});

const enhance = compose(
  connect(null, mapDispatchToProps),
  branch(({ review }) => !review, renderNothing),
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
    meanings: PropTypes.array.isRequired,
    readings: PropTypes.array.isRequired,
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

function VocabEntryDetail({ review, handleLockClick }) {
  const boolToString = (bool) => bool ? 'True' : 'False';
  return (
    <div>
      <Meaning review={review} />
      {review.readings.length > 0 && <Readings review={review} />}
      <EnhancedSynonyms reviewId={review.id} synonyms={review.synonyms} />
      <P>Ready for review: {boolToString(review.isReviewReady)}</P>
      <P>KW LastReviewDate: {getDateInWords(review.lastReviewDate)}</P>
      <P>KW UnlockDate: {getDateInWords(review.unlockDate)}</P>
      <P>KW NextReviewDate: {getDateInWords(review.nextReviewDate)}</P>
      <P>KW Correct: {boolToString(review.correct)}</P>
      <P>KW Incorrect: {boolToString(review.incorrect)}</P>
      <P>KW Notes: {boolToString(review.notes)}</P>
      <P>KW Burned: {boolToString(review.isBurned)}</P>
      <P>
        {review.isHidden ? 'Locked ' : 'Unlocked '}
        <LockButton
          inline
          id={review.id}
          isLocked={review.isHidden}
          handleClick={handleLockClick}
        />
      </P>
      <P>KW Critical: {boolToString(review.isCritical)}</P>
      <P>KW Streak: {review.streak}</P>
      <P>KW StreakName: {review.streakName}</P>
      <P>WK Burned: {boolToString(review.wk.isBurned)}</P>
      <P>WK Streak: {review.wk.streak}</P>
      <P>WK StreakName: {review.wk.streakName}</P>
    </div>
  );
}

export default enhance(VocabEntryDetail);
