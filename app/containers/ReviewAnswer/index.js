import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import blockEvent from 'utils/blockEvent';
import { getShortcutAction } from './utils';
import { selectCurrentStreakName } from 'containers/Review/selectors';
import AnswerInput from 'containers/AnswerInput';
import { showModal } from 'containers/Modal/actions';
import { ADD_SYNONYM_MODAL } from 'containers/Modal/constants';
import { toggleVocabInfo } from 'containers/ReviewInfo/actions';

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
    const action = getShortcutAction(event);
    if (action) {
      this[action](event);
      console.log('handleKeyDown calling: ', action); // eslint-disable-line no-console
    }
  }

  _ignoreAnswer = (event) => {
    const { disabled, matches } = this.props;
    if (disabled) {
      blockEvent(event);
      this.props.ignoreAnswer(matches);
    }
  }

  _processAnswer = (event) => {
    if (this.props.disabled) {
      blockEvent(event);
      this.props.processAnswer();
    }
  }

  _checkAnswer = (event) => {
    const { marked } = this.props;
    if (!marked) {
      blockEvent(event);
      this.props.checkAnswer();
    }
  }

  _toggleKanaInfo = (event) => {
    if (this.props.disabled) {
      blockEvent(event);
      this.props.toggleVocabInfo({ kana: true });
    }
  }

  _toggleCharInfo = (event) => {
    if (this.props.disabled) {
      blockEvent(event);
      this.props.toggleVocabInfo({ characters: true });
    }
  }

  _toggleVocabInfo = (event) => {
    if (this.props.disabled) {
      blockEvent(event);
      this.props.toggleVocabInfo({ characters: true, kana: true });
    }
  }

  _showSynonymModal = (event) => {
    if (this.props.disabled) {
      blockEvent(event);
      this.props.showSynonymModal();
    }
  }

  render() {
    const { streakName, marked, valid, matches, disabled } = this.props; // eslint-disable-line no-shadow
    return (
      <Form
        innerRef={(node) => { this.answerForm = node; }}
        marked={marked}
        valid={valid}
        onSubmit={marked && valid ? this._processAnswer : this._checkAnswer}
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
        <IgnoreButton
          valid={valid}
          marked={marked}
          onIgnoreClick={this._ignoreAnswer}
        />
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
    toggleVocabInfo: (options) => dispatch(toggleVocabInfo(options)),
    showSynonymModal: (options) => dispatch(showModal({ modalType: ADD_SYNONYM_MODAL, ...options })),
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
  toggleVocabInfo: PropTypes.func.isRequired,
  showSynonymModal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewAnswer);
