import React from 'react';
import PropTypes from 'prop-types';
import { setPropTypes } from 'recompose';
import uuid from 'uuid';

import PrimaryReading from 'components/PrimaryReading';
import ReadingHeader from 'components/ReadingHeader';
import SynonymHeader from 'components/SynonymHeader';
import SentencePair from 'components/SentencePair';

VocabEntryDetail.propTypes = {
  entry: PropTypes.object.isRequired,
};

const MainReading = setPropTypes({
  entry: PropTypes.object.isRequired,
})(({ entry }) => (
  <div>
    <PrimaryReading entry={entry} />
    <SentencePair entry={entry} />
  </div>
));

const AlternateReadings = ({ id, items }) => items.map(reading => (
  <div key={uuid()}>
    <ReadingHeader
      id={id}
      primaryCharacter={reading.character}
      tags={reading.tags}
    />
    <MainReading entry={reading} />
  </div>
));

const EntrySynonyms = ({ items }) => items.map(synonym => (
  <div key={uuid()}>
    <SynonymHeader tags={synonym.tags} />
    <MainReading entry={synonym} />
  </div>
));


function VocabEntryDetail({ entry, entry: { id, readings, synonyms } }) {
  const [primaryReading, ...alternateReadings] = readings;

  return (
    <div>
      <MainReading entry={primaryReading} />
      <AlternateReadings id={id} items={alternateReadings} />
      <EntrySynonyms items={synonyms} />
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
