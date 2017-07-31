import React from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';

// import SearchBar from 'containers/SearchBar';
import ToggleVocabListButton from 'components/ToggleVocabListButton';

import { Wrapper, Heading, Title, Controls } from './styles';

VocabPageHeader.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  withVocabListToggle: PropTypes.bool.isRequired,
  cardsExpanded: PropTypes.bool,
  toggleCardsExpanded: PropTypes.func,
};

VocabPageHeader.defaultProps = {
  cardsExpanded: true,
  toggleCardsExpanded: () => {},
};

function VocabPageHeader({
  pageTitle,
  cardsExpanded,
  toggleCardsExpanded,
  withVocabListToggle,
}) {
  return (
    <Wrapper>
      <Heading>
        <Title>{pageTitle}</Title>
      </Heading>
      <Controls>
        {/* <SearchBar /> */}
        {withVocabListToggle && (
          <ToggleVocabListButton
            cardsExpanded={cardsExpanded}
            toggleCardsExpanded={toggleCardsExpanded}
          />
        )}
      </Controls>
    </Wrapper>
  );
}

export default pure(VocabPageHeader);
