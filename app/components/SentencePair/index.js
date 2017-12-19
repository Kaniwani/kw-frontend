import React from "react";
import PropTypes from "prop-types";

import MarkedSentence from "components/MarkedSentence";
import RevealSentence from "components/RevealSentence";
import { Wrapper } from "./styles";

SentencePair.propTypes = {
  word: PropTypes.string.isRequired,
  primaryReading: PropTypes.string.isRequired,
  sentenceEn: PropTypes.string.isRequired,
  sentenceJa: PropTypes.string.isRequired,
};

function SentencePair({
  word, primaryReading, sentenceEn, sentenceJa,
}) {
  return (
    <Wrapper>
      <MarkedSentence sentence={sentenceJa} word={word} reading={primaryReading} />
      <RevealSentence sentence={sentenceEn} />
    </Wrapper>
  );
}

export default SentencePair;
