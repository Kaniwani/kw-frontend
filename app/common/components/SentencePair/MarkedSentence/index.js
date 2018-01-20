import React from 'react';
import PropTypes from 'prop-types';
import splitSentenceByMatch from 'common/utils/splitSentenceByMatch';
import A from 'common/components/A';

import { Sentence, VocabMark } from './styles';

MarkedSentence.propTypes = {
  sentence: PropTypes.string.isRequired,
  word: PropTypes.string,
  reading: PropTypes.string,
  verbType: PropTypes.string,
};

MarkedSentence.defaultProps = {
  word: '',
  reading: '',
  verbType: '',
};

function MarkedSentence({ sentence, word, reading, verbType }) {
  const { head, match, tail } = splitSentenceByMatch({ sentence, word, reading, verbType });

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
