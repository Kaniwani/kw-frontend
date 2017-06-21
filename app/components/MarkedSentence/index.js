import React from 'react';
import PropTypes from 'prop-types';

import splitSentenceByMatch from 'utils/splitSentenceByMatch';
import A from 'base/A';

import { Sentence, VocabMark } from './styles';

MarkedSentence.propTypes = {
  sentence: PropTypes.string.isRequired,
  character: PropTypes.string,
  kana: PropTypes.array,
};

MarkedSentence.defaultProps = {
  character: '',
  kana: [],
};

function MarkedSentence({ sentence, character, kana }) {
  const { head, match, tail } = splitSentenceByMatch(sentence, character, kana);

  return (
    <Sentence lang="ja">
      <A
        href={`http://jisho.org/search/${sentence}`}
        title="Deconstruct sentence at Jisho.org"
        plainLink
        external
      >
        <span>{head}</span>
        <VocabMark>{match}</VocabMark>
        <span>{tail}</span>
      </A>
    </Sentence>
  );
}

export default MarkedSentence;
