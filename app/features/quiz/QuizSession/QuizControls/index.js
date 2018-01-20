import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Controls, ControlButton } from './styles';

import {
  selectInfoDisabled,
  selectInfoDetailLevel,
} from 'features/quiz/QuizSession/QuizInfo/selectors';

QuizControls.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  detailLevel: PropTypes.number.isRequired,
  onWrapUp: PropTypes.func.isRequired,
  onInfo: PropTypes.func.isRequired,
  onAddSynonym: PropTypes.func.isRequired,
};

const getLabel = (level) => {
  switch (level) {
    case 0:
      return 'INFO: LOW';
    case 1:
      return 'INFO: MID';
    case 2:
      return 'INFO: HIGH';
    default:
      return 'INFO';
  }
};

export function QuizControls({ onWrapUp, onInfo, onAddSynonym, detailLevel, isDisabled }) {
  return (
    <Controls>
      <ControlButton disabled={isDisabled} onClick={onWrapUp}>
        Wrap Up
      </ControlButton>
      <ControlButton disabled={isDisabled} onClick={onInfo}>
        {getLabel(detailLevel)}
      </ControlButton>
      <ControlButton disabled={isDisabled} onClick={onAddSynonym}>
        Add Synonym
      </ControlButton>
    </Controls>
  );
}

const mapStateToProps = (state, props) => ({
  isDisabled: selectInfoDisabled(state, props),
  detailLevel: selectInfoDetailLevel(state, props),
});

export default connect(mapStateToProps)(QuizControls);
