import React from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';

import { ToggleButton } from './styles';

ToggleVocabListButton.propTypes = {
  cardsExpanded: PropTypes.bool.isRequired,
  toggleCardsExpanded: PropTypes.func.isRequired,
};

function ToggleVocabListButton({ cardsExpanded, toggleCardsExpanded }) {
  return (
    <ToggleButton
      name={cardsExpanded ? 'CONTRACT_ALL' : 'EXPAND_ALL'}
      title={cardsExpanded ? 'Shrink card size' : 'Enlarge card size'}
      size="2em"
      onClick={toggleCardsExpanded}
    />
  );
}

export default pure(ToggleVocabListButton);
