import React from "react";
import PropTypes from "prop-types";

import Aux from "base/Aux";
import Ruby from "components/Ruby";
import P from 'base/P';

const SecondaryReadings = P.extend`
  opacity: 0.8;
  line-height: 1;
`;

VocabWord.propTypes = {
  word: PropTypes.string.isRequired,
  primaryReading: PropTypes.string,
  secondaryReadings: PropTypes.array,
  furi: PropTypes.string,
  renderPrimary: PropTypes.func,
  renderSecondary: PropTypes.func,
};

VocabWord.defaultProps = {
  primaryReading: "",
  secondaryReadings: [],
  furi: "",
  renderPrimary: (props) => <Ruby {...props} />,
  renderSecondary: ({ text }) => text && <SecondaryReadings lang="ja">{text}</SecondaryReadings>, // eslint-disable-line react/prop-types
};

function VocabWord({
  word,
  primaryReading,
  secondaryReadings,
  furi,
  renderPrimary,
  renderSecondary,
}) {
  return (
    <Aux>
      {renderPrimary({ word, reading: primaryReading, furi })}
      {renderSecondary({ text: secondaryReadings.join(" ・ ") })}
    </Aux>
  );
}

export default VocabWord;
