import React from 'react';
import PropTypes from 'prop-types';

import { ToggleButton } from './styles';

ToggleVocabListType.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

function ToggleVocabListType({ isExpanded, handleClick }) {
  return (
    <ToggleButton
      name={isExpanded ? 'CONTRACT_ALL' : 'EXPAND_ALL'}
      title="Toggle Vocab Card size"
      size="2em"
      onClick={handleClick}
    />
  );
}

export default ToggleVocabListType;
