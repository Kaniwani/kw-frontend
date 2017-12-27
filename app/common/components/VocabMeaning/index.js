import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { titleCase, truncate } from "voca";

import Aux from "common/components/Aux";
import { selectPrimaryMeaning, selectSecondaryMeanings } from "features/reviews/selectors";

import { PrimaryMeaning, SecondaryMeanings } from "./styles";

VocabMeaning.propTypes = {
  primaryMeaning: PropTypes.string.isRequired,
  secondaryMeanings: PropTypes.arrayOf(PropTypes.string),
  shouldTruncate: PropTypes.bool,
  showSecondary: PropTypes.bool,
  renderPrimary: PropTypes.func,
  renderSecondary: PropTypes.func,
};

VocabMeaning.defaultProps = {
  secondaryMeanings: [],
  showSecondary: true,
  shouldTruncate: false,
  renderPrimary: ({ text }) => <PrimaryMeaning>{text}</PrimaryMeaning>, // eslint-disable-line react/prop-types
  renderSecondary: ({ text }) => text && <SecondaryMeanings>{text}</SecondaryMeanings>, // eslint-disable-line react/prop-types
};

function VocabMeaning({
  primaryMeaning,
  secondaryMeanings,
  shouldTruncate,
  showSecondary,
  renderPrimary,
  renderSecondary,
}) {
  const noSplit = ["'"];
  let secondaryText = secondaryMeanings.join(", ");
  secondaryText = truncate(secondaryText, shouldTruncate ? 30 : secondaryText.length);
  return (
    <Aux>
      {renderPrimary({ text: titleCase(primaryMeaning, noSplit) })}
      {showSecondary &&
        !!secondaryText.length &&
        renderSecondary({ text: titleCase(secondaryText, noSplit) })}
    </Aux>
  );
}

const mapStateToProps = createStructuredSelector({
  primaryMeaning: selectPrimaryMeaning,
  secondaryMeanings: selectSecondaryMeanings,
});

export default connect(mapStateToProps)(VocabMeaning);
