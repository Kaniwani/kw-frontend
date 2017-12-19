import React from 'react';
import PropTypes from 'prop-types';
import splitSentenceByMatch from 'utils/splitSentenceByMatch';
import A from 'base/A';

import { Sentence, VocabMark } from './styles';

MarkedSentence.propTypes = {
  sentence: PropTypes.string.isRequired,
  word: PropTypes.string,
  reading: PropTypes.string,
};

MarkedSentence.defaultProps = {
  word: '',
  reading: [],
};

function MarkedSentence({ sentence, word, reading }) {
  const { head, match, tail } = splitSentenceByMatch(sentence, word, reading);

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
