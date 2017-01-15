import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Wrapper, Toggle } from './styles';

import actions from 'containers/ReviewSession/actions';
import { PANELS } from 'shared/constants';

import {
  selectAnswerMarked,
  selectPanelToShow,
  selectInfoDetailName,
} from 'containers/ReviewSession/selectors';

function ToggleBar({
  isAnswerMarked,
  panelToShow,
  detailLevelName,
  handleInfoClick,
  showSettingsPanel,
  showNotesPanel,
  showSynonymPanel,
}) {
  return (
    <Wrapper>
      <Toggle
        className={(!isAnswerMarked && 'is-disabled') || (panelToShow === PANELS.SETTINGS && 'is-active')}
        onClick={showSettingsPanel}
      >
        Settings
      </Toggle>
      <Toggle
        className={(!isAnswerMarked && 'is-disabled') || (panelToShow === PANELS.INFO && 'is-active')}
        onClick={() => handleInfoClick(panelToShow)}
      >
        Info: {detailLevelName}
      </Toggle>
      <Toggle
        className={(!isAnswerMarked && 'is-disabled') || (panelToShow === PANELS.NOTES && 'is-active')}
        onClick={showNotesPanel}
      >
        Notes
      </Toggle>
      <Toggle
        className={(!isAnswerMarked && 'is-disabled') || (panelToShow === PANELS.SYNONYM && 'is-active')}
        onClick={showSynonymPanel}
      >
        New Synonym
      </Toggle>
    </Wrapper>
  );
}

ToggleBar.propTypes = {
  showSettingsPanel: PropTypes.func.isRequired,
  showNotesPanel: PropTypes.func.isRequired,
  showSynonymPanel: PropTypes.func.isRequired,
  handleInfoClick: PropTypes.func.isRequired,
  detailLevelName: PropTypes.string.isRequired,
  isAnswerMarked: PropTypes.bool.isRequired,
  panelToShow: PropTypes.oneOf(Object.values(PANELS)),
};

const mapStateToProps = createStructuredSelector({
  isAnswerMarked: selectAnswerMarked,
  panelToShow: selectPanelToShow,
  detailLevelName: selectInfoDetailName,
});

const mapDispatchToProps = (dispatch) => ({
  showNotesPanel: () => dispatch(actions.showPanel(PANELS.NOTES)),
  showSettingsPanel: () => dispatch(actions.showPanel(PANELS.SETTINGS)),
  showSynonymPanel: () => dispatch(actions.showPanel(PANELS.SYNONYM)),
  handleInfoClick: (shownPanel) =>
    dispatch(shownPanel === PANELS.INFO ? actions.cycleInfoDetail() : actions.showPanel(PANELS.INFO)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToggleBar);
