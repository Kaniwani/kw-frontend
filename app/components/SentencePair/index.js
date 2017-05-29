import React from 'react';
import PropTypes from 'prop-types';

import MarkedSentence from 'components/MarkedSentence';
import { Wrapper, Sentence } from 'components/MarkedSentence/styles';

SentencePair.propTypes = {
  sentenceEN: PropTypes.string.isRequired,
  sentenceJA: PropTypes.string.isRequired,
  character: PropTypes.string.isRequired,
  kana: PropTypes.string.isRequired,
};

function SentencePair({ sentenceEN, sentenceJA, character, kana }) {
  return (
    <Wrapper>
      <MarkedSentence sentence={sentenceJA} character={character} kana={kana} />
      <Sentence>{sentenceEN}</Sentence>
    </Wrapper>
  );
}

export default SentencePair;
