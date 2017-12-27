import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { titleCase } from "voca";
import cuid from "cuid";

import VocabList, { ITEM_TYPES as VOCABLIST_TYPES } from "common/components/VocabList";
import StripeHeading from "./StripeHeading";

import { gutter } from "common/styles/layout";

// prettier-ignore
const Wrapper = styled.div`
  ${gutter({ type: "inner" })}
`;

const VocabListRanked = ({
  rankedIds, sectionType, color, cardsExpanded,
}) =>
  Object.entries(rankedIds).map(([rank, ids]) => {
    const count = ids.length;
    return (
      count > 0 && (
        <Wrapper key={cuid()}>
          <StripeHeading text={titleCase(rank)} count={count} />
          <VocabList
            itemType={cardsExpanded ? VOCABLIST_TYPES.CARD : VOCABLIST_TYPES.CHIP}
            ids={ids}
            color={color}
            tooltipSuffix={`${sectionType}-${rank}`}
          />
        </Wrapper>
      )
    );
  });

VocabListRanked.propTypes = {
  rankedIds: PropTypes.object,
  sectionType: PropTypes.string,
  color: PropTypes.string,
  cardsExpanded: PropTypes.bool,
};

export default VocabListRanked;
