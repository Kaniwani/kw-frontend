import React from 'react';
import PropTypes from 'prop-types';

import { Controls, ControlButton } from './styles';

QuizControls.propTypes = {
  onWrapUp: PropTypes.func.isRequired,
  onInfo: PropTypes.func.isRequired,
  onAddSynonym: PropTypes.func.isRequired,
};

function QuizControls({
  onWrapUp,
  onInfo,
  onAddSynonym,
  disabled,
}) {
  return (
    <Controls>
      <ControlButton disabled={disabled} onClick={onWrapUp}>
        Wrap Up
      </ControlButton>
      <ControlButton disabled={disabled} onClick={onInfo}>
        Info: TODO
      </ControlButton>
      <ControlButton disabled={disabled} onClick={onAddSynonym}>
        Add Synonym
      </ControlButton>
    </Controls>
  );
}

export default QuizControls;
