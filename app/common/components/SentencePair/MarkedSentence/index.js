import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import splitSentenceByMatch from 'common/utils/splitSentenceByMatch';
import A from 'common/components/A';

import { Sentence, VocabMark } from './styles';

MarkedSentence.propTypes = {
  sentence: PropTypes.string.isRequired,
  head: PropTypes.string.isRequired,
  match: PropTypes.string.isRequired,
  tail: PropTypes.string.isRequired,
};

function MarkedSentence({ sentence, head, match, tail }) {
  return (
    <Sentence lang="ja">
      <A
        href={`https://jisho.org/search/${sentence}`}
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

const enhance = connect((state, props) => {
  const { head, match, tail } = splitSentenceByMatch(props);
  return { sentence: props.sentence, head, match, tail };
});

export default enhance(MarkedSentence);
