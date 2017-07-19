import React from 'react';
import PropTypes from 'prop-types';

import VocabEntryMeanings from 'components/VocabEntryMeanings';
import VocabEntryReadings from 'components/VocabEntryReadings';
import VocabEntrySynonyms from 'components/VocabEntrySynonyms';
import VocabEntryNotes from 'components/VocabEntryNotes';

VocabEntry.propTypes = {
  id: PropTypes.number.isRequired,
};

function VocabEntry({ id }) {
  return (
    <div>
      <VocabEntryMeanings id={id} />
      <VocabEntryReadings id={id} />
      <VocabEntrySynonyms id={id} />
      <VocabEntryNotes id={id} />
    </div>
  );
}

export default VocabEntry;
