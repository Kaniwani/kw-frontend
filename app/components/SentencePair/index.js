import React from "react";
import PropTypes from "prop-types";

import MarkedSentence from "./MarkedSentence";
import RevealSentence from "./RevealSentence";
import { Wrapper } from "./styles";

SentencePair.propTypes = {
  sentenceEn: PropTypes.string.isRequired,
  sentenceJa: PropTypes.string.isRequired,
  character: PropTypes.string.isRequired,
  kana: PropTypes.array.isRequired,
};

// TODO: placeholder explaining no sentence data - better than blowing up

function SentencePair({
  sentenceEn, sentenceJa, character, kana,
}) {
  return (
    <Wrapper>
      <MarkedSentence sentence={sentenceJa} character={character} kana={kana} />
      <RevealSentence sentence={sentenceEn} />
    </Wrapper>
  );
}

export default SentencePair;
