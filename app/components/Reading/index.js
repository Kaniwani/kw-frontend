import React from "react";
import PropTypes from "prop-types";

import { Wrapper, Character, Kana } from "./styles";

Reading.propTypes = {
  character: PropTypes.string,
  kana: PropTypes.arrayOf(PropTypes.string),
  detailLevel: PropTypes.number,
};

Reading.defaultProps = {
  character: "",
  kana: [],
  detailLevel: 2,
};

// FIXME: showKana bool instead of detailLevel
function Reading({ character, kana, detailLevel }) {
  return (
    <Wrapper>
      {detailLevel >= 1 && <Kana>{kana.join("・")}</Kana>}
      <Character>{character}</Character>
    </Wrapper>
  );
}

export default Reading;
