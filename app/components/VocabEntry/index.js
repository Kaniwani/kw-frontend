import React from 'react';
import PropTypes from 'prop-types';
import { compose, onlyUpdateForKeys, branch, renderNothing } from 'recompose';

import VocabEntryMeanings from 'components/VocabEntryMeanings';
import VocabEntryReadings from 'components/VocabEntryReadings';
import VocabEntrySynonyms from 'components/VocabEntrySynonyms';
import AddSynonym from 'components/AddSynonym';

import { Wrapper, MeaningsWrapper, SynonymsWrapper } from './styles';

VocabEntry.propTypes = {
  id: PropTypes.number.isRequired,
};

function VocabEntry({ id }) {
  return (
    <Wrapper>
      <MeaningsWrapper>
        <VocabEntryMeanings id={id} />
      </MeaningsWrapper>
      <VocabEntryReadings id={id} />
      <SynonymsWrapper>
        <AddSynonym id={id} />
        <VocabEntrySynonyms id={id} />
      </SynonymsWrapper>
    </Wrapper>
  );
}

const enhance = compose(
  branch(({ id, review }) => !id || !review, renderNothing),
  onlyUpdateForKeys(['id']),
);

export default enhance(VocabEntry);
