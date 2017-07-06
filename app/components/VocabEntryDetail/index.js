import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { branch, renderNothing } from 'recompose';
import titleCase from 'voca/title_case';
import getDateInWords from 'utils/getDateInWords';

import H1 from 'base/H1';
import P from 'base/P';
import Container from 'base/Container';
import ReadingHeader from 'components/ReadingHeader';
import SynonymHeader from 'components/SynonymHeader';
import SentencePair from 'components/SentencePair';
import KanjiStroke from 'components/KanjiStroke';

VocabEntryDetail.propTypes = {
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

const Reading = ({ kana, character }) => (
  <Container>
    <H1>{character}</H1>
    <P>{kana.join('・')}</P>
  </Container>
);

const Readings = ({ review }) => (
  <div>
    {review.readings.map((reading) => (
      <div key={uuid()} >
        <ReadingHeader
          id={review.id}
          character={reading.character}
          tags={reading.tags}
          withKwLink={false}
        />
        <Reading character={reading.character} kana={reading.kana} />
        <SentencePair reading={reading} />
        <KanjiStroke character={reading.character} />
      </div>
    )
  )}
  </div>
);


const Synonyms = ({ review, review: { synonyms } }) => synonyms.map((synonym) => (
  <SynonymHeader
    key={uuid()}
    id={synonym.id}
    reviewId={review.id}
    character={synonym.character}
  />
));

const Meaning = ({ review }) => {
  const [first, ...rest] = review.meanings;
  return (
    <Container>
      <H1>{titleCase(first)}</H1>
      <P>{titleCase(rest.join(', '))}</P>
    </Container>
  );
};

function VocabEntryDetail({ review }) {
  const boolToString = (bool) => bool ? 'True' : 'False';
  return (
    <div>
      <Meaning review={review} />
      {review.readings.length > 0 && <Readings review={review} />}
      {review.synonyms.length > 0 && <Synonyms review={review} />}
      <P>Ready for review: {boolToString(review.isReviewReady)}</P>
      <P>KW LastReviewDate: {getDateInWords(review.lastReviewDate)}</P>
      <P>KW UnlockDate: {getDateInWords(review.unlockDate)}</P>
      <P>KW NextReviewDate: {getDateInWords(review.nextReviewDate)}</P>
      <P>KW Correct: {boolToString(review.correct)}</P>
      <P>KW Incorrect: {boolToString(review.incorrect)}</P>
      <P>KW Notes: {boolToString(review.notes)}</P>
      <P>KW Burned: {boolToString(review.isBurned)}</P>
      <P>KW Hidden: {boolToString(review.isHidden)}</P>
      <P>KW Critical: {boolToString(review.isCritical)}</P>
      <P>KW Streak: {review.streak}</P>
      <P>KW StreakName: {review.streakName}</P>
      <P>WK Burned: {boolToString(review.wk.isBurned)}</P>
      <P>WK Streak: {review.wk.streak}</P>
      <P>WK StreakName: {review.wk.streakName}</P>
    </div>
  );
}

const enhance = branch(({ review }) => !review, renderNothing);

export default enhance(VocabEntryDetail);
