import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import quiz from 'pages/QuizPage/actions';
import {
  selectInfoActivePanel,
  selectInfoDetailLevel,
} from 'pages/QuizPage/selectors';
import { Wrapper } from './styles';
import Toggle from './Toggle';

class ToggleBar extends React.Component {
  static propTypes = {
    activePanel: PropTypes.string,
    updateInfo: PropTypes.func.isRequired,
    cycleInfoDetail: PropTypes.func.isRequired,
    detailLevel: PropTypes.number.isRequired,
    isDisabled: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    activePanel: 'INFO',
  };

  onNotesClick = () => this.props.updateInfo({ activePanel: 'NOTES' });
  onInfoClick = () => {
    if (this.props.activePanel === 'INFO') {
      this.props.cycleInfoDetail();
    } else {
      this.props.updateInfo({ activePanel: 'INFO' });
    }
  };
  onSynonymClick = () => this.props.updateInfo({ activePanel: 'SYNONYM' });

  infoPanelText = (level, isDisabled, isActive) => {
    const text = 'Info';
    if (isActive && !isDisabled) {
      if (level === 0) return `${text}: LOW`;
      if (level === 1) return `${text}: MID`;
      return `${text}: HIGH`;
    }
    return text;
  };

  render() {
    const { activePanel, detailLevel, isDisabled } = this.props;
    return (
      <Wrapper>
        <Toggle
          isActive={activePanel === 'NOTES'}
          handleClick={this.onNotesClick}
        >
          Notes
        </Toggle>
        <Toggle
          innerRef={(node) => {
            this.infoRef = node;
          }}
          isActive={activePanel === 'INFO'}
          handleClick={this.onInfoClick}
        >
          {this.infoPanelText(detailLevel, isDisabled, activePanel === 'INFO')}
        </Toggle>
        <Toggle
          isActive={activePanel === 'SYNONYM'}
          handleClick={this.onSynonymClick}
        >
          Add Synonym
        </Toggle>
      </Wrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  activePanel: selectInfoActivePanel,
  detailLevel: selectInfoDetailLevel,
});

const mapDispatchToProps = {
  updateInfo: quiz.info.update,
  cycleInfoDetail: quiz.info.cycledetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(ToggleBar);
