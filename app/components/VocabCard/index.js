import React from "react";
import PropTypes from "prop-types";

import VocabWord from "components/VocabWord";
import VocabMeaning from "components/VocabMeaning";

import { whiteLight, purple } from "shared/styles/colors";

import { Wrapper, Link } from "./styles";

VocabCard.propTypes = {
  id: PropTypes.number.isRequired,
  word: PropTypes.string.isRequired,
  furi: PropTypes.string.isRequired,
  primaryReading: PropTypes.string.isRequired,
  primaryMeaning: PropTypes.string.isRequired,
  secondaryMeanings: PropTypes.array,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
};

VocabCard.defaultProps = {
  secondaryMeanings: [],
  bgColor: purple,
  textColor: whiteLight,
};

function VocabCard({
  id,
  word,
  furi,
  primaryReading,
  primaryMeaning,
  secondaryMeanings,
  textColor,
  bgColor,
  ...props
}) {
  return (
    <Wrapper textColor={textColor} bgColor={bgColor} {...props}>
      <Link plainLink to={`/vocabulary/entry/${id}`}>
        <VocabWord
          word={word}
          primaryReading={primaryReading}
          renderSecondary={() => {}}
          furi={furi}
        />
        <VocabMeaning
          primaryMeaning={primaryMeaning}
          secondaryMeanings={secondaryMeanings}
        />
      </Link>
    </Wrapper>
  );
}

export default VocabCard;
