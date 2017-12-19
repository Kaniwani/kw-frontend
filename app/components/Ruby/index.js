import React from "react";
import PropTypes from "prop-types";
import uuid from "uuid";

import { combineFuri } from "./utils";

import { Wrapper, Block, Furi, Chars } from "./styles";

Ruby.propTypes = {
  word: PropTypes.string.isRequired,
  reading: PropTypes.string,
  furi: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  showFuri: PropTypes.bool,
};

Ruby.defaultProps = {
  reading: "",
  furi: "",
  showFuri: true,
};

function Ruby({
  word, reading, furi, showFuri,
}) {
  const pairs = combineFuri(word, reading, furi);
  return (
    <Wrapper>
      {pairs.map(([kana, chars]) => (
        <Block key={uuid()} lang="ja">
          {showFuri && <Furi>{kana}</Furi>}
          <Chars>{chars}</Chars>
        </Block>
      ))}
    </Wrapper>
  );
}

export default Ruby;
