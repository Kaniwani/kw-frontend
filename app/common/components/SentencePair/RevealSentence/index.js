import React from "react";
import PropTypes from "prop-types";

import { Wrapper, Sentence, RevealIcon } from "./styles";

RevealSentence.propTypes = {
  sentence: PropTypes.string,
};

RevealSentence.defaultProps = {
  sentence: '',
};

function RevealSentence({ sentence }) {
  return sentence && (
    <Wrapper>
      <Sentence tabIndex="0">
        {sentence}
        <RevealIcon name="EYE" />
      </Sentence>
    </Wrapper>
  );
}

export default RevealSentence;
