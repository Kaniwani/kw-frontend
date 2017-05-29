import React from 'react';
import PropTypes from 'prop-types';

import SearchBar from 'containers/SearchBar';
import ToggleVocabListType from 'components/ToggleVocabListType';
import { Wrapper, Heading, Title, Controls } from './styles';

VocabPageHeader.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  withVocabListToggle: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      isExpanded: PropTypes.bool,
      handleToggle: PropTypes.func,
    }),
  ]).isRequired,
};

function VocabPageHeader({ pageTitle, withVocabListToggle }) {
  const renderVocabListToggle = () => (
    <ToggleVocabListType
      isExpanded={withVocabListToggle.isExpanded}
      handleClick={withVocabListToggle.handleToggle}
    />
  );

  return (
    <Wrapper>
      <Heading>
        {/* FIXME: TODO: breadcrumbs for vocab root, level, & vocab entry should be lang="ja" */}
        <Title>{pageTitle}</Title>
      </Heading>
      <Controls>
        <SearchBar />
        {withVocabListToggle && renderVocabListToggle()}
      </Controls>
    </Wrapper>
  );
}

export default VocabPageHeader;
