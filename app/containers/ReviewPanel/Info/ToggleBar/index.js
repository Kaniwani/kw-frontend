import React from 'react';
import PropTypes from 'prop-types';
import titleCase from 'voca/title_case';

import { DETAIL_LEVELS } from '../constants';
import { Wrapper } from './styles';
import Toggle from './Toggle';

ToggleBar.propTypes = {
  detailLevel: PropTypes.oneOf(Object.values(DETAIL_LEVELS)),
  isDisabled: PropTypes.bool,
  notes: PropTypes.shape({ isActive: PropTypes.bool }),
  info: PropTypes.shape({ isActive: PropTypes.bool }),
  addSynonym: PropTypes.shape({ isActive: PropTypes.bool }),
  handleInfoClick: PropTypes.func.isRequired,
  handleNotesClick: PropTypes.func.isRequired,
  handleSynonymClick: PropTypes.func.isRequired,
};

ToggleBar.defaultProps = {
  detailLevel: DETAIL_LEVELS.LOW,
  isDisabled: true,
  notes: { isActive: false },
  info: { isActive: false },
  addSynonym: { isActive: false },
};

function ToggleBar({
  detailLevel,
  isDisabled,
  notes,
  info,
  addSynonym,
  handleNotesClick,
  handleInfoClick,
  handleSynonymClick,
}) {
  return (
    <Wrapper>
      <Toggle
        isActive={notes.isActive}
        isDisabled={isDisabled}
        handleClick={handleNotesClick}
      >
        Notes
      </Toggle>

      <Toggle
        isActive={info.isActive}
        isDisabled={isDisabled}
        handleClick={handleInfoClick}
      >
        Info: {titleCase(detailLevel)}
      </Toggle>

      <Toggle
        isActive={addSynonym.isActive}
        isDisabled={isDisabled}
        handleClick={handleSynonymClick}
      >
        New Synonym
      </Toggle>
    </Wrapper>
  );
}

export default ToggleBar;
