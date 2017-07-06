import React from 'react';
import PropTypes from 'prop-types';
import { compose, flattenProp, onlyUpdateForKeys } from 'recompose';

import MarkedSentence from 'components/MarkedSentence';
import { Wrapper, Sentence } from 'components/MarkedSentence/styles';

const enhance = compose(
  flattenProp('reading'),
  onlyUpdateForKeys(['sentenceEn', 'sentenceJa', 'character', 'kana']),
);

SentencePair.propTypes = {
  sentenceEn: PropTypes.string.isRequired,
  sentenceJa: PropTypes.string.isRequired,
  character: PropTypes.string.isRequired,
  kana: PropTypes.array.isRequired,
};

function SentencePair({ sentenceEn, sentenceJa, character, kana }) {
  return (
    <Wrapper>
      <MarkedSentence sentence={sentenceJa} character={character} kana={kana} />
      <Sentence>{sentenceEn}</Sentence>
    </Wrapper>
  );
}

export default enhance(SentencePair);
