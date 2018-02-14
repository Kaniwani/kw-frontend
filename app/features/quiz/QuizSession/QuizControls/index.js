import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Controls, ControlButton } from './styles';

import { selectWrapUp, selectSessionRemainingCount } from 'features/quiz/QuizSession/selectors';
import {
  selectInfoDisabled,
  selectInfoDetailLevel,
} from 'features/quiz/QuizSession/QuizInfo/selectors';

QuizControls.propTypes = {
  onWrapUp: PropTypes.func.isRequired,
  onInfo: PropTypes.func.isRequired,
  onAddSynonym: PropTypes.func.isRequired,
  detailLevel: PropTypes.number.isRequired,
  wrapUp: PropTypes.object.isRequired,
  remainingCount: PropTypes.number.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

const getDetailText = (level) => {
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

const getWrapUpText = ({ active, count }, remainingCount) =>
  !active ? 'Wrap Up' : <strong>Wrap Up: {Math.min(count, remainingCount)}</strong>;

export function QuizControls({
  onWrapUp,
  onInfo,
  onAddSynonym,
  detailLevel,
  wrapUp,
  remainingCount,
  isDisabled,
}) {
  return (
    <Controls>
      <ControlButton active={wrapUp.active} onClick={onWrapUp}>
        {getWrapUpText(wrapUp, remainingCount)}
      </ControlButton>
      <ControlButton disabled={isDisabled} onClick={onInfo}>
        {getDetailText(detailLevel)}
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
  wrapUp: selectWrapUp(state, props),
  remainingCount: selectSessionRemainingCount(state, props),
});

export default connect(mapStateToProps)(QuizControls);
