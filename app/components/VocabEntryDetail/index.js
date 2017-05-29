import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

import PrimaryReading from 'components/PrimaryReading';
import ReadingHeader from 'components/ReadingHeader';
import SynonymHeader from 'components/SynonymHeader';
import SentencePair from 'components/SentencePair';

VocabEntryDetail.propTypes = {
  entry: PropTypes.object.isRequired,
};

/* eslint-disable react/prop-types */
const renderReading = ({ character, kana, sentenceEn, sentenceJa }) => (
  <div>
    <PrimaryReading
      character={character}
      kana={kana}
    />
    <SentencePair
      sentenceEN={sentenceEn}
      sentenceJA={sentenceJa}
      character={character}
      kana={kana}
    />
  </div>
);
/* eslint-enable */

function VocabEntryDetail({ entry }) {
  return (
    <div>
      {entry.readings.slice(0, 1).map((reading) => renderReading(reading))}
      {entry.readings.slice(1).map((reading) => (
        <div key={uuid}>
          <ReadingHeader
            id={entry.id}
            primaryCharacter={reading.character}
            tags={reading.tags}
          />
          {renderReading(reading)}
        </div>
      ))}
      {entry.synonyms.map((synonym) => (
        <div key={uuid}>
          <SynonymHeader tags={synonym.tags} />
          {renderReading(synonym)}
        </div>
      ))}
      <p>Your Progression: WK: Burned KW: Guru</p>
      <p>Answered Correct: 95% of 23 times</p>


      <p>debug</p>
      <pre>
        <code>
          {JSON.stringify(entry, null, 2)}
        </code>
      </pre>
    </div>
  );
}

export default VocabEntryDetail;
