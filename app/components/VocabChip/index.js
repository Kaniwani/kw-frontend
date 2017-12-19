import React from "react";
import PropTypes from "prop-types";

import { purple, whiteLight } from "shared/styles/colors";
import { Wrapper, Link, Text } from "./styles";

VocabChip.propTypes = {
  id: PropTypes.number.isRequired,
  word: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
};

VocabChip.defaultProps = {
  bgColor: purple,
  textColor: whiteLight,
};

function VocabChip({
  id,
  word,
  bgColor,
  textColor,
  ...props
}) {
  return (
    <Wrapper bgColor={bgColor} textColor={textColor} {...props}>
      <Link plainLink to={`/vocabulary/entry/${id}`}>
        <Text lang="ja" shadowColor={bgColor}>
          {word}
        </Text>
      </Link>
    </Wrapper>
  );
}

export default VocabChip;
