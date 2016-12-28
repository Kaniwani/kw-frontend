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

  // TODO: could use a selector instead than 3 unused props
  _getMarkClassname = ({ marked, valid, matches }) => {
    switch (true) {
      case (valid != null && !valid): return 'is-invalid';
      case (marked && valid && !matches): return 'is-marked is-incorrect';
      case (marked && valid && matches): return 'is-marked is-correct';
      default: return '';
    }
  };

  render() {
    const { streakName, disabled } = this.props; // eslint-disable-line no-shadow

    return (
      <Form
        className={this._getMarkClassname(this.props)}
        innerRef={(node) => { this.answerForm = node; }}
        onSubmit={disabled ? this._processAnswer : this._checkAnswer}
        tabIndex={-1}
      >
        {/* TODO: <StreakAnimation /> */}
        <AnswerInput streakName={streakName} onIgnore={this._ignoreAnswer} disabled={disabled} />
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
    showNewSynonymPanel: () => dispatch(toggleNewSynonymPanel({ show: true })),
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
