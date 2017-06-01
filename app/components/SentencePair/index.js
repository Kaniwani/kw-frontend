import React from 'react';
import PropTypes from 'prop-types';
import { compose, setDisplayName, setPropTypes, flattenProp, onlyUpdateForKeys } from 'recompose';

import MarkedSentence from 'components/MarkedSentence';
import { Wrapper, Sentence } from 'components/MarkedSentence/styles';

const enhance = compose(
  setPropTypes({
    entry: PropTypes.shape({
      sentenceEn: PropTypes.string.isRequired,
      sentenceJa: PropTypes.string.isRequired,
      character: PropTypes.string.isRequired,
      kana: PropTypes.array.isRequired,
    }).isRequired,
  }),
  flattenProp('entry'),
  onlyUpdateForKeys(['sentenceEn', 'sentenceJa', 'character', 'kana']),
  setDisplayName('SentencePair'),
);

const SentencePair = enhance(({ sentenceEn, sentenceJa, character, kana }) => (
  <Wrapper>
    <MarkedSentence sentence={sentenceJa} character={character} kana={kana} />
    <Sentence>{sentenceEn}</Sentence>
  </Wrapper>
));

export default SentencePair;
