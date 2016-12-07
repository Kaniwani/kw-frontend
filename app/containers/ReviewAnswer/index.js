/**
*
* ReviewAnswer
*
*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import keydown from 'react-keydown';

import { handleShortcuts } from './utils';
import { selectCurrentStreak } from 'containers/Review/selectors';
import AnswerInput from 'containers/AnswerInput';
import { showModal } from 'containers/Modal/actions';
import { toggleVocabInfo } from 'containers/ReviewInfo/actions';

import {
  selectAnswerMarked,
  selectAnswerValid,
  selectkeysInListMatch,
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

class ReviewAnswer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillReceiveProps({ keydown, disabled }) { // eslint-disable-line no-shadow
    if (disabled && keydown.event) {
      this.handleKeyDown(keydown.event);
    }
  }

  handleKeyDown = (event) => handleShortcuts(event, this);

  ignore = (event) => {
    const { valid, matches, ignoreAnswer } = this.props;
    if (valid) {
      event.preventDefault();
      ignoreAnswer(matches);
    }
  }

  process = (event) => {
    event.preventDefault();
    this.props.processAnswer();
  }

  check = (event) => {
    event.preventDefault();
    this.props.checkAnswer();
  }

  /* eslint-disable class-methods-use-this */
  toggleInfo(options) {
    this.props.toggleVocabInfo(options);
  }
  /* eslint-enable */

  showAddAnswerSynonym() {
    this.props.showSynonymModal();
  }

  render() {
    const { streak, marked, valid, matches, disabled } = this.props; // eslint-disable-line no-shadow
    return (
      <Form
        marked={marked}
        valid={valid}
        onSubmit={marked && valid ? this.process : this.check}
      >
        <StreakIcon
          streak={streak}
        />
        <AnswerInput
          disabled={disabled}
          streak={streak}
          marked={marked}
          matches={matches}
          valid={valid}
        />
        <IgnoreButton
          onIgnoreClick={this.ignore}
        />
        <SubmitButton />
        {/* <StreakAnimation /> */}
      </Form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  streak: selectCurrentStreak(),
  marked: selectAnswerMarked(),
  valid: selectAnswerValid(),
  matches: selectkeysInListMatch(),
  disabled: selectInputDisabled(),
});

function mapDispatchToProps(dispatch) {
  return {
    checkAnswer: () => dispatch(checkAnswer()),
    processAnswer: () => dispatch(processAnswer()),
    ignoreAnswer: (correct) => dispatch(markIgnored(correct)),
    toggleVocabInfo: (options) => dispatch(toggleVocabInfo(options)),
    showSynonymModal: () => dispatch(showModal()),
  };
}

ReviewAnswer.propTypes = {
  streak: PropTypes.number.isRequired,
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

export default keydown(connect(mapStateToProps, mapDispatchToProps)(ReviewAnswer));
