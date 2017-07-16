import React from 'react';
import PropTypes from 'prop-types';

import SearchBar from 'containers/SearchBar';
import ToggleVocabListButton from 'components/ToggleVocabListButton';

import { Wrapper, Heading, Title, Controls } from './styles';

VocabPageHeader.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  withVocabListToggle: PropTypes.bool.isRequired,
};

function VocabPageHeader({ pageTitle, withVocabListToggle }) {
  return (
    <Wrapper>
      <Heading>
        <Title>{pageTitle}</Title>
      </Heading>
      <Controls>
        <SearchBar />
        {withVocabListToggle && <ToggleVocabListButton />}
      </Controls>
    </Wrapper>
  );
}

export default VocabPageHeader;
