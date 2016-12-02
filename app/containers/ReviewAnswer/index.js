/**
*
* ReviewAnswer
*
*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import keydown from 'react-keydown';

import { KEYS } from 'shared/constants';
import { selectCurrentStreak } from 'containers/Review/selectors';
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
} from 'containers/Review/actions';

import AnswerInput from 'containers/AnswerInput';
import Form from './Form';
import StreakIcon from './StreakIcon';
import SubmitButton from './SubmitButton';
import IgnoreButton from './IgnoreButton';

class ReviewAnswer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillReceiveProps({ keydown, disabled }) { // eslint-disable-line no-shadow
    if (disabled && keydown.event) {
      this.handleShortcuts(keydown.event);
    }
  }

  /* eslint-disable no-console */
  /* eslint-disable class-methods-use-this */

  handleShortcuts = (event) => {
    const keyCode = event.which;
    switch (true) {
      case (keyCode === KEYS.ENTER):
        this.process(event);
        break;

      // Pressing P toggles phonetic reading
      case (keyCode === KEYS.P_LOWERCASE || keyCode === KEYS.P_UPPERCASE):
        this.showInfo({ kana: true });
        break;

      // Pressing K toggles the actual kanji reading.
      case (keyCode === KEYS.K_LOWERCASE || keyCode === KEYS.K_UPPERCASE):
        this.showInfo({ kanji: true });
        break;

      // Pressing F toggles both item info boxes.
      case (keyCode === KEYS.F_LOWERCASE || keyCode === KEYS.F_UPPERCASE):
        this.showInfo();
        break;

      // Pressing S toggles add synonym modal.
      case (keyCode === KEYS.S_LOWERCASE || keyCode === KEYS.S_UPPERCASE):
        this.showAddAnswerSynonym();
        break;

      // Pressing I ignores answer when input has been marked incorrect
      case (keyCode === KEYS.I_LOWERCASE || keyCode === KEYS.I_UPPERCASE ||
            keyCode === KEYS.BACKSPACE || keyCode === KEYS.FORWARD_SLASH):
        this.ignore(event);
        break;
      default: console.log('default case in Review handleShortcuts');
    }
  }

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


  showInfo({ kana, kanji } = {}) {
    console.log(`show ${(kana ? 'kana' : kanji ? 'kanji' : 'both')} info pls`); // eslint-disable-line
  }

  showAddAnswerSynonym() {
    console.log('show add synonym pls');
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
  matches: selectAnswerMatches(),
  disabled: selectInputDisabled(),
});

function mapDispatchToProps(dispatch) {
  return {
    checkAnswer: () => dispatch(checkAnswer()),
    processAnswer: () => dispatch(processAnswer()),
    ignoreAnswer: (correct) => dispatch(markIgnored(correct)),
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
};

export default keydown(connect(mapStateToProps, mapDispatchToProps)(ReviewAnswer));
