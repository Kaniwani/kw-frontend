import React from 'react';
import PropTypes from 'prop-types';
import { branch, renderNothing } from 'recompose';

import VocabEntryMeanings from 'components/VocabEntryMeanings';
import VocabEntryReadings from 'components/VocabEntryReadings';
import VocabEntrySynonyms from 'components/VocabEntrySynonyms';
import VocabEntryNotes from 'components/VocabEntryNotes';
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
        <AddSynonym id={id} answerValue="" answerType="" />
        <VocabEntrySynonyms id={id} />
      </SynonymsWrapper>
      <VocabEntryNotes id={id} />
    </Wrapper>
  );
}

const enhance = branch(({ id, review }) => !id || !review, renderNothing);

export default enhance(VocabEntry);
