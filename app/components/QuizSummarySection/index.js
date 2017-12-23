import React from "react";
import PropTypes from "prop-types";
import { flatten } from "lodash";

import VocabListRanked from "components/VocabListRanked";

import { purple, green, red, orange } from "shared/styles/colors";
import { Section, Placeholder, Heading } from "./styles";

export const SECTION_TYPES = {
  CORRECT: "CORRECT",
  INCORRECT: "INCORRECT",
  CRITICAL: "CRITICAL",
};

export const PLACEHOLDERS = {
  CORRECT: "ʕノ•ᴥ•ʔノ ︵ ┻━┻",
  INCORRECT: " (๑•̀ㅂ•́)و",
  CRITICAL: "(^・ω・^ )",
};

const COLORS = {
  CORRECT: green,
  INCORRECT: red,
  CRITICAL: orange,
};

QuizSummarySection.propTypes = {
  items: PropTypes.object.isRequired,
  sectionType: PropTypes.oneOf(Object.values(SECTION_TYPES)),
  color: PropTypes.string,
  cardsExpanded: PropTypes.bool,
};

QuizSummarySection.defaultProps = {
  sectionType: SECTION_TYPES.CORRECT,
  color: purple,
  cardsExpanded: false,
};

// items: makeSelectReviewsGroupedByRank(ids)(state),

function QuizSummarySection({
  items, sectionType, color, cardsExpanded,
}) {
  const itemCount = flatten(Object.values(items)).length;
  const sectionColor = COLORS[sectionType] || color;
  const text = `${itemCount} ${sectionType.toLowerCase()}`;

  return (
    <Section>
      <Heading color={sectionColor}>{text}</Heading>
      {!itemCount ? (
        <Placeholder>{PLACEHOLDERS[sectionType]}</Placeholder>
      ) : (
        <VocabListRanked
          items={items}
          sectionType={sectionType}
          color={sectionColor}
          cardsExpanded={cardsExpanded}
        />
      )}
    </Section>
  );
}

export default QuizSummarySection;
