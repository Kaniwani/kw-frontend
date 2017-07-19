import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Sentence, RevealIcon } from './styles';

RevealSentence.propTypes = {
  sentence: PropTypes.string.isRequired,
};

function RevealSentence({ sentence }) {
  return (
    <Wrapper tabIndex="0">
      <Sentence>{sentence}</Sentence>
      <RevealIcon name="EYE" title="View masked sentence" />
    </Wrapper>
  );
}

export default RevealSentence;
