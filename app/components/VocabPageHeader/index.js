import React from 'react';
import PropTypes from 'prop-types';

import SearchBar from 'containers/SearchBar';
import ToggleVocabListType from 'components/ToggleVocabListType';
import { Wrapper, Heading, Title, Controls } from './styles';

VocabPageHeader.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  vocabListExpanded: PropTypes.bool.isRequired,
  handleToggleVocabList: PropTypes.func.isRequired,
};

function VocabPageHeader({ pageTitle, vocabListExpanded, handleToggleVocabList }) {
  return (
    <Wrapper>
      <Heading>
        <Title>{pageTitle}</Title>
      </Heading>
      <Controls>
        <SearchBar />
        <ToggleVocabListType
          isExpanded={vocabListExpanded}
          handleClick={handleToggleVocabList}
        />
      </Controls>
    </Wrapper>
  );
}

export default VocabPageHeader;

