import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, SearchInput, SubmitButton } from './styles';

ExpandingSearch.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleInputFocus: PropTypes.func.isRequired,
  inputRef: PropTypes.func.isRequired,
  keywords: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool,
  isSubmitting: PropTypes.bool,
};

ExpandingSearch.defaultProps = {
  isExpanded: false,
  isSubmitting: false,
};

function ExpandingSearch({
  handleInputChange,
  handleInputFocus,
  inputRef,
  keywords,
  isExpanded,
  isSubmitting,
}) {
  return (
    <Wrapper>
      <SearchInput
        lang="ja"
        innerRef={inputRef}
        value={keywords}
        isExpanded={isExpanded}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
      />
      <SubmitButton
        size="32px"
        name={isSubmitting ? 'SYNC' : 'SEARCH'}
        title={isSubmitting ? 'Searching...' : `Search vocabulary for: ${keywords}`}
        type="submit"
        color="whiteLight"
        bgColor="blueLight"
        isExpanded={isExpanded}
        isSubmitting={isSubmitting}
      />
    </Wrapper>
  );
}

export default ExpandingSearch;
