import React from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';

import VocabEntryMeanings from 'components/VocabEntryMeanings';
import VocabEntryReadings from 'components/VocabEntryReadings';
import VocabEntrySynonyms from 'components/VocabEntrySynonyms';

VocabEntry.propTypes = {
  id: PropTypes.number.isRequired,
};

function VocabEntry({ id }) {
  return (
    <div>
      <VocabEntryMeanings id={id} />
      <VocabEntryReadings id={id} />
      <VocabEntrySynonyms id={id} />
    </div>
  );
}

export default pure(VocabEntry);
