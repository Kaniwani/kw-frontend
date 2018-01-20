import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import pluralize from 'common/utils/pluralize';

import search from './actions';

import { selectSearchResultIds, selectIsSearching, selectIsSearchComplete } from './selectors';

import Container from 'common/components/Container';
import Element from 'common/components/Element';
import H3 from 'common/components/H3';
import Button from 'common/components/Button';
import VocabList from 'common/components/VocabList';

import { blue, orange } from 'common/styles/colors';

SearchResults.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.number),
  isSearching: PropTypes.bool,
  isSearchComplete: PropTypes.bool,
  onReset: PropTypes.func.isRequired,
};

SearchResults.defaultProps = {
  ids: [],
  isSearching: false,
  isSearchComplete: false,
};

export function SearchResults({ ids, isSearching, isSearchComplete, onReset }) {
  const wordsFoundText = `${ids.length} ${pluralize('word', ids.length)} found ${
    isSearching ? ' so far...' : ''
  }`;
  return (
    (isSearching || isSearchComplete) && (
      <Container>
        <Element flexRow flexCenter>
          <H3>{(isSearching && 'Searching...') || wordsFoundText}</H3>
          {isSearchComplete && (
            <Button bgColor={orange} colorHover={orange} onClick={onReset}>
              Clear Results
            </Button>
          )}
        </Element>
        <VocabList ids={ids} color={blue} showSecondary showFuri />
      </Container>
    )
  );
}

const mapStateToProps = (state, props) => ({
  ids: selectSearchResultIds(state, props),
  isSearching: selectIsSearching(state, props),
  isSearchComplete: selectIsSearchComplete(state, props),
});

const mapDispatchToProps = {
  onReset: search.clear,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
