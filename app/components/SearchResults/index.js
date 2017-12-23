import React from "react";
import PropTypes from "prop-types";

import pluralize from "utils/pluralize";

import Container from "base/Container";
import H2 from "base/H2";
import H3 from "base/H3";
import VocabList from "components/VocabList";

import { blue } from "shared/styles/colors";

SearchResults.propTypes = {
  items: PropTypes.array,
  isSearching: PropTypes.bool,
  isSearchComplete: PropTypes.bool,
};

SearchResults.defaultProps = {
  items: [],
  isSearching: false,
  isSearchComplete: false,
};

function SearchResults({ items, isSearching, isSearchComplete }) {
  return (
    (isSearching || isSearchComplete) && (
      <Container>
        {isSearching && <H2>Searching...</H2>}
        <H3>
          {items.length}
          {pluralize(" word", items.length)}
          {" found"}
          {isSearching ? " so far..." : ""}
        </H3>
        <VocabList items={items} color={blue} isExpanded />
      </Container>
    )
  );
}

export default SearchResults;
