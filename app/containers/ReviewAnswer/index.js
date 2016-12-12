import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import KeyHandler, { KEYUP } from 'react-key-handler';
import { KEYS } from 'shared/constants';

import blockEvent from 'utils/blockEvent';
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
  _ignoreAnswer = (event) => {
    const { valid, disabled, matches } = this.props;
    if (valid && disabled) {
      blockEvent(event);
      this.props.ignoreAnswer(matches);
    }
  }

  _processAnswer = (event) => {
    blockEvent(event);
    this.props.processAnswer();
  }

  _checkAnswer = (event) => {
    blockEvent(event);
    this.props.checkAnswer();
  }

  _toggleKanaInfo = (event) => {
    blockEvent(event);
    this.props.toggleVocabInfo({ kana: true });
  }

  _toggleCharInfo = (event) => {
    blockEvent(event);
    this.props.toggleVocabInfo({ characters: true });
  }

  _toggleVocabInfo = (event) => {
    blockEvent(event);
    this.props.toggleVocabInfo({ characters: true, kana: true });
  }

  _showSynonymModal = (event) => {
    blockEvent(event);
    this.props.showSynonymModal();
  }

  render() {
    const { streakName, marked, valid, matches, disabled } = this.props; // eslint-disable-line no-shadow
    return (
      <Form marked={marked} valid={valid} onSubmit={marked && valid ? this._processAnswer : this._checkAnswer}>
        {valid && disabled && (
          <div>
            <KeyHandler keyEventName={KEYUP} keyValue="p" onKeyHandle={this._toggleKanaInfo} />
            <KeyHandler keyEventName={KEYUP} keyValue="k" onKeyHandle={this._toggleCharInfo} />
            <KeyHandler keyEventName={KEYUP} keyValue="f" onKeyHandle={this._toggleVocabInfo} />
            <KeyHandler keyEventName={KEYUP} keyValue="s" onKeyHandle={this._showSynonymModal} />
            <KeyHandler keyEventName={KEYUP} keyValue="i" onKeyHandle={this._ignoreAnswer} />
            <KeyHandler keyEventName={KEYUP} keyValue="enter" onKeyHandle={(ev) => { console.log(ev); }} />
            <KeyHandler keyEventName={KEYUP} keyValue="/" onKeyHandle={this._ignoreAnswer} />
          </div>
        )}
        {/* TODO: <StreakAnimation /> */}
        <StreakIcon streak={streakName} />
        <AnswerInput
          disabled={disabled}
          marked={marked}
          matches={matches}
          valid={valid}
        />
        <IgnoreButton
          onIgnoreClick={this._ignoreAnswer}
          valid={valid}
          marked={marked}
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
