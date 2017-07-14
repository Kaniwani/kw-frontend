import React from 'react';
import PropTypes from 'prop-types';

import { DETAIL_LEVELS } from 'shared/constants';
import { cycleDetailLevel } from './utils';
import ToggleBar from './ToggleBar';
import InfoPanel from './InfoPanel';
import NotesPanel from './NotesPanel';
import AddSynonymPanel from './AddSynonymPanel';

import { Wrapper, PanelsWrapper } from './styles';

class QuizInfo extends React.PureComponent {
  static propTypes = {
    entry: PropTypes.object.isRequired,
    detailLevel: PropTypes.string,
    isDisabled: PropTypes.bool,
    notes: PropTypes.shape({ isActive: PropTypes.bool }),
    info: PropTypes.shape({ isActive: PropTypes.bool }),
    addSynonym: PropTypes.shape({ isActive: PropTypes.bool }),
  };

  static defaultProps = {
    detailLevel: DETAIL_LEVELS.LOW,
    isDisabled: true,
    notes: { isActive: false },
    info: { isActive: false },
    addSynonym: { isActive: false },
  };

  state = {
    // start with user settings, then manage with state when mounted
    detailLevel: this.props.detailLevel,
    notes: this.props.notes,
    info: this.props.info,
    addSynonym: this.props.addSynonym,
  }

  handleNotesClick = () => {
    this.setState({
      notes: { isActive: true },
      info: { isActive: false },
      addSynonym: { isActive: false },
    });
  }

  handleInfoClick = () => {
    if (this.state.info.isActive) {
      this.setState({
        detailLevel: cycleDetailLevel(this.state.detailLevel),
      });
    } else {
      this.setState({
        notes: { isActive: false },
        info: { isActive: true },
        addSynonym: { isActive: false },
      });
    }
  }

  handleSynonymClick = () => {
    this.setState({
      info: { isActive: false },
      notes: { isActive: false },
      addSynonym: { isActive: true },
    });
  }

  render() {
    const { entry, isDisabled } = this.props;
    const { detailLevel, notes, info, addSynonym } = this.state;

    return (
      <Wrapper>
        <ToggleBar
          detailLevel={detailLevel}
          isDisabled={isDisabled}
          notes={notes}
          info={info}
          addSynonym={addSynonym}
          handleNotesClick={this.handleNotesClick}
          handleInfoClick={this.handleInfoClick}
          handleSynonymClick={this.handleSynonymClick}
        />
        <PanelsWrapper>
          <NotesPanel
            isActive={notes.isActive}
            entry={entry}
            detailLevel={detailLevel}
          />
          <InfoPanel
            isActive={info.isActive}
            entry={entry}
            detailLevel={detailLevel}
          />
          <AddSynonymPanel
            isActive={addSynonym.isActive}
            entry={entry}
            addPadding={detailLevel !== DETAIL_LEVELS.LOW}
          />
        </PanelsWrapper>
      </Wrapper>
    );
  }
}

// const mapStateToProps = createStructuredSelector({
//   detailLevel: selectDetailLevel,
//   isDisabled: !selectAnswerMarked,
//   info: selectInfoPanel
//   notes: selectNotesPanel
//   addSynonym: selectSynonymPanel
// });

export default QuizInfo;
