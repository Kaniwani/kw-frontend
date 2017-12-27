import React from "react";
import PropTypes from "prop-types";

import { Wrapper, Character, Kana } from "./styles";

Reading.propTypes = {
  word: PropTypes.string,
  kana: PropTypes.arrayOf(PropTypes.string),
  detailLevel: PropTypes.number,
};

Reading.defaultProps = {
  word: "",
  kana: [],
  detailLevel: 2,
};

// FIXME: showKana bool instead of detailLevel
function Reading({ word, kana, detailLevel }) {
  return (
    <Wrapper>
      {detailLevel >= 1 && <Kana>{kana.join("・")}</Kana>}
      <Character>{word}</Character>
    </Wrapper>
  );
}

export default Reading;
