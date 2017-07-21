import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import quiz from 'containers/QuizPage/actions';
import { selectInfoActivePanel, selectInfoDetailLevel } from 'containers/QuizPage/selectors';
import { Wrapper } from './styles';
import Toggle from './Toggle';


class ToggleBar extends React.Component {
  static propTypes = {
    activePanel: PropTypes.string,
    updateInfo: PropTypes.func.isRequired,
    cycleInfoDetail: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    detailLevel: PropTypes.number.isRequired,
  };

  static defaultProps = {
    activePanel: 'INFO',
  };

  componentDidUpdate(prevProps) {
    if (prevProps.isDisabled && !this.props.isDisabled) {
      this.infoRef.focus();
    }
  }

  onNotesClick = () => this.props.updateInfo({ activePanel: 'NOTES' });
  onInfoClick = () => {
    if (this.props.activePanel === 'INFO') {
      this.props.cycleInfoDetail();
    } else {
      this.props.updateInfo({ activePanel: 'INFO' });
    }
  };
  onSynonymClick = () => this.props.updateInfo({ activePanel: 'SYNONYM' });

  render() {
    const { activePanel, detailLevel } = this.props;
    return (
      <Wrapper>
        <Toggle isActive={activePanel === 'NOTES'} handleClick={this.onNotesClick}>Notes</Toggle>
        <Toggle
          innerRef={(node) => { this.infoRef = node; }}
          isActive={activePanel === 'INFO'}
          handleClick={this.onInfoClick}
        >
          {`Info: ${detailLevel ? 'HIGH' : 'LOW'}`}
        </Toggle>
        <Toggle isActive={activePanel === 'SYNONYM'} handleClick={this.onSynonymClick}>Add Synonym</Toggle>
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
