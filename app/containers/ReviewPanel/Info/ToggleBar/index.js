import React from 'react';
import PropTypes from 'prop-types';

import titleCase from 'voca/title_case';
import { cycleDetailLevel } from './utils';
import { Wrapper } from './styles';
import Toggle from './Toggle';

const DETAIL_LEVELS = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
};

class ToggleBar extends React.Component {
  static propTypes = {
    detailLevel: PropTypes.oneOf(Object.values(DETAIL_LEVELS)),
    isDisabled: PropTypes.bool,
    notes: PropTypes.shape({ isActive: PropTypes.bool }),
    info: PropTypes.shape({ isActive: PropTypes.bool }),
    synonym: PropTypes.shape({ isActive: PropTypes.bool }),
    showNotesPanel: PropTypes.func.isRequired,
    showSynonymPanel: PropTypes.func.isRequired,
    showInfoPanel: PropTypes.func.isRequired,
  }

  static defaultProps = {
    detailLevel: DETAIL_LEVELS.LOW,
    isDisabled: false,
    notes: { isActive: false },
    info: { isActive: true },
    synonym: { isActive: false },
  };

  state = {
    // start with user settings, then manage with state when mounted
    detailLevel: this.props.detailLevel,
  }

  handleNotesClick = () => {
    this.props.showNotesPanel();
  }

  handleInfoClick = () => {
    if (this.props.info.isActive) {
      this.setState({ detailLevel: cycleDetailLevel(this.state.detailLevel) });
    } else {
      this.props.showInfoPanel();
    }
  }

  handleSynonymClick = () => {
    this.props.showSynonymPanel();
  }

  render() {
    const { isDisabled, notes, info, synonym } = this.props;
    return (
      <Wrapper>
        <Toggle
          isActive={notes.isActive}
          isDisabled={isDisabled}
          handleClick={this.handleNotesClick}
        >
          Notes
        </Toggle>
        <Toggle
          isActive={info.isActive}
          isDisabled={isDisabled}
          handleClick={this.handleInfoClick}
        >
          Info: {titleCase(this.state.detailLevel)}
        </Toggle>
        <Toggle
          isActive={synonym.isActive}
          isDisabled={isDisabled}
          handleClick={this.handleSynonymClick}
        >
          New Synonym
        </Toggle>
      </Wrapper>
    );
  }
}

/* const mapStateToProps = createStructuredSelector({
  isAnswerMarked: selectAnswerMarked,
  panelToShow: selectPanelToShow,
  detailLevel: selectDetailLevel,
});

const mapDispatchToProps = (dispatch) => ({
  showNotesPanel: () => dispatch(actions.showPanel(REVIEW_INFO_PANELS.NOTES)),
  showSynonymPanel: () => dispatch(actions.showPanel(REVIEW_INFO_PANELS.SYNONYM)),
  showInfoPanel: () => dispatch(actions.showPanel(REVIEW_INFO_PANELS.INFO)),
  cycleInfoDetail: () => dispatch(globalActions.cycleInfoDetail()),
});
*/
export default ToggleBar;
