import React from "react";
import PropTypes from "prop-types";

import { Sentence, RevealIcon } from "./styles";

RevealSentence.propTypes = {
  sentence: PropTypes.string.isRequired,
};

function RevealSentence({ sentence }) {
  return (
    <div>
      <Sentence tabIndex="0">
        {sentence}
        <RevealIcon name="EYE" />
      </Sentence>
    </div>
  );
}

export default RevealSentence;
