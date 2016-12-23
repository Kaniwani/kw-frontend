import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import blockEvent from 'utils/blockEvent';
import { getShortcutAction } from './utils';
import { selectCurrentStreakName } from 'containers/ReviewSession/selectors';
import AnswerInput from 'containers/AnswerInput';
import {
  toggleInfoPanels,
  toggleInfoDepth,
  toggleNewSynonymPanel,
 } from 'containers/ReviewInfo/actions';

import {
  selectAnswerMarked,
  selectAnswerValid,
  selectAnswerMatches,
  selectInputDisabled,
 } from 'containers/AnswerInput/selectors';

import {
  markIgnored,
  checkAnswer,
  processAnswer,
} from './actions';


import Form from './Form';
import StreakIcon from './StreakIcon';
import SubmitButton from './SubmitButton';
import IgnoreButton from './IgnoreButton';

class ReviewAnswer extends React.PureComponent {
  componentDidMount() {
    this.answerForm.addEventListener('keydown', this._handleKeyDown);
  }

  componentDidUpdate() {
    if (this.props.disabled) this.answerForm.focus();
  }

  componentWillUnmount() {
    this.answerForm.removeEventListener('keydown', this._handleKeyDown);
  }

  _handleKeyDown = (event) => {
    const action = getShortcutAction(event.keyCode, this.props.disabled);
    if (action) {
      blockEvent(event);
      this[action]();
      console.log('handleKeyDown calling: ', action); // eslint-disable-line no-console
    }
  }

  _ignoreAnswer = () => {
    this.props.ignoreAnswer(this.props.matches);
  }

  _processAnswer = () => {
    this.props.processAnswer();
  }

  _checkAnswer = (event) => {
    const { marked, valid } = this.props;
    if (!marked || !valid) {
      blockEvent(event);
      this.props.checkAnswer();
    }
  }

  _toggleInfoPanels = () => {
    this.props.toggleInfoPanels();
  }

  _toggleInfoDepth = () => {
    this.props.toggleInfoDepth();
  }

  _showNewSynonymPanel = () => {
    this.props.showNewSynonymPanel();
  }

  render() {
    const { streakName, marked, valid, matches, disabled } = this.props; // eslint-disable-line no-shadow
    return (
      <Form
        innerRef={(node) => { this.answerForm = node; }}
        marked={marked}
        valid={valid}
        onSubmit={disabled ? this._processAnswer : this._checkAnswer}
        tabIndex={-1}
      >
        {/* TODO: <StreakAnimation /> */}
        <StreakIcon streak={streakName} />
        <AnswerInput
          disabled={disabled}
          marked={marked}
          matches={matches}
          valid={valid}
        />
        { disabled && <IgnoreButton onIgnoreClick={this._ignoreAnswer} />}
        <SubmitButton />
      </Form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  streakName: selectCurrentStreakName(),
  marked: selectAnswerMarked(),
  valid: selectAnswerValid(),
  matches: selectAnswerMatches(),
  disabled: selectInputDisabled(),
});

function mapDispatchToProps(dispatch) {
  return {
    checkAnswer: () => dispatch(checkAnswer()),
    processAnswer: () => dispatch(processAnswer()),
    ignoreAnswer: (isCorrect) => dispatch(markIgnored(isCorrect)),
    toggleInfoPanels: () => dispatch(toggleInfoPanels()),
    toggleInfoDepth: () => dispatch(toggleInfoDepth()),
    showNewSynonymPanel: (options) => dispatch(toggleNewSynonymPanel({ show: true })),
  };
}

ReviewAnswer.propTypes = {
  streakName: PropTypes.string.isRequired,
  marked: PropTypes.bool.isRequired,
  valid: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.null,
  ]),
  disabled: PropTypes.bool.isRequired,
  matches: PropTypes.bool.isRequired,
  checkAnswer: PropTypes.func.isRequired,
  processAnswer: PropTypes.func.isRequired,
  ignoreAnswer: PropTypes.func.isRequired,
  toggleInfoPanels: PropTypes.func.isRequired,
  toggleInfoDepth: PropTypes.func.isRequired,
  showNewSynonymPanel: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewAnswer);
