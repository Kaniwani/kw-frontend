import React from "react";
import PropTypes from "prop-types";
import { pure } from "recompose";

import SearchBar from "containers/SearchBar";
import VocabListToggleButton from "components/VocabListToggleButton";
import VocabSearchResults from "./VocabSearchResults";

import { Wrapper, Heading, Title, Controls } from "./styles";

VocabPageHeader.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  withVocabListToggle: PropTypes.bool.isRequired,
  cardsExpanded: PropTypes.bool,
  toggleCardsExpanded: PropTypes.func,
};

VocabPageHeader.defaultProps = {
  cardsExpanded: true,
  toggleCardsExpanded: null,
};

function VocabPageHeader({
  pageTitle,
  cardsExpanded,
  toggleCardsExpanded,
  withVocabListToggle,
}) {
  return (
    <div>
      <Wrapper>
        <Heading>
          <Title>{pageTitle}</Title>
        </Heading>
        <Controls>
          <SearchBar />
          {withVocabListToggle && (
            <VocabListToggleButton
              cardsExpanded={cardsExpanded}
              onToggle={toggleCardsExpanded}
            />
          )}
        </Controls>
      </Wrapper>
      <VocabSearchResults cardsExpanded={cardsExpanded} />
    </div>
  );
}

export default pure(VocabPageHeader);
