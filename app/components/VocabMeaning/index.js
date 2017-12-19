import React from "react";
import PropTypes from "prop-types";
import truncate from "voca/truncate";

import Aux from "base/Aux";

import { PrimaryMeaning, SecondaryMeanings } from "./styles";

VocabMeaning.propTypes = {
  primaryMeaning: PropTypes.string.isRequired,
  secondaryMeanings: PropTypes.arrayOf(PropTypes.string),
  shouldTruncate: PropTypes.bool,
  renderPrimary: PropTypes.func,
  renderSecondary: PropTypes.func,
};

VocabMeaning.defaultProps = {
  secondaryMeanings: [],
  shouldTruncate: false,
  renderPrimary: ({ text }) => <PrimaryMeaning>{text}</PrimaryMeaning>, // eslint-disable-line react/prop-types
  renderSecondary: ({ text }) => <SecondaryMeanings>{text}</SecondaryMeanings>, // eslint-disable-line react/prop-types
};

function VocabMeaning({
  primaryMeaning,
  secondaryMeanings,
  shouldTruncate,
  renderPrimary,
  renderSecondary,
}) {
  let secondaryText = secondaryMeanings.join(", ");
  secondaryText = secondaryMeanings.length
    ? truncate(secondaryText, shouldTruncate ? 40 : secondaryText.length)
    : "";
  return (
    <Aux>
      {renderPrimary({ text: primaryMeaning })}
      {renderSecondary({ text: secondaryText })}
    </Aux>
  );
}

export default VocabMeaning;
