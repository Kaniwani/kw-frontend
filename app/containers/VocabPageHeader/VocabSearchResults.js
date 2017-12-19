import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import pluralize from "utils/pluralize";

import { selectUi, selectSearchIds } from "shared/selectors";

import Container from "base/Container";
import H2 from "base/H2";
import H3 from "base/H3";
import VocabList from "components/VocabList";

VocabSearchResults.propTypes = {
  cardsExpanded: PropTypes.bool.isRequired,
  searchResults: PropTypes.array,
  isSearching: PropTypes.bool.isRequired,
  isSearchFinished: PropTypes.bool.isRequired,
};

function VocabSearchResults({
  cardsExpanded,
  searchResults,
  isSearching,
  isSearchFinished,
}) {
  const hasResults = searchResults.length > 0;
  const noResults = !hasResults;
  return (
    (isSearching || isSearchFinished) && (
      <Container>
        {isSearching && <H2>Searching...</H2>}
        {hasResults && (
          <H3>
            {searchResults.length}
            {pluralize(" word", searchResults.length)}
            {" found"}
            {isSearching ? " so far..." : ""}
          </H3>
        )}
        {isSearchFinished && noResults && <H3>No Search Results</H3>}
        <VocabList ids={searchResults} color="blue" isExpanded={cardsExpanded} />
      </Container>
    )
  );
}

const mapStateToProps = (state) => ({
  searchResults: selectSearchIds(state),
  isSearching: selectUi(state).search.loading,
  isSearchFinished: selectUi(state).search.finished,
});

export default connect(mapStateToProps)(VocabSearchResults);
