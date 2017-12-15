import React from "react";
import PropTypes from "prop-types";
import { titleCase } from "voca";
import { compose, branch, renderNothing } from "recompose";

import { SRS_RANKS } from "shared/constants";
import VocabList from "containers/VocabList";
import StripeHeading from "components/StripeHeading";
import { Wrapper } from "./styles";

RankedVocabList.propTypes = {
  rank: PropTypes.oneOf(Object.values(SRS_RANKS)).isRequired,
  ids: PropTypes.array.isRequired,
  color: PropTypes.string.isRequired,
  cardsExpanded: PropTypes.bool.isRequired,
};

function RankedVocabList({
  rank, ids, color, cardsExpanded,
}) {
  return (
    <Wrapper>
      <StripeHeading text={titleCase(rank)} count={ids.length} />
      <VocabList ids={ids} color={color} isExpanded={cardsExpanded} />
    </Wrapper>
  );
}

export default compose(branch(({ ids }) => !ids.length, renderNothing))(RankedVocabList);
