import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { AnswerRecord } from 'shared/models';
import { KEYCODES } from 'shared/constants';
import blockEvent from 'utils/blockEvent';
import AnswerInput from 'containers/AnswerInput';
import reviewActions from 'containers/ReviewSession/actions';
import { selectAnswer, selectCurrentStreakName } from 'containers/ReviewSession/selectors';

import Form from './Form';

export class ReviewAnswer extends React.Component {
  static propTypes = {
    streakName: PropTypes.string.isRequired,
    answer: PropTypes.instanceOf(AnswerRecord),
    checkAnswer: PropTypes.func.isRequired,
    handleInput: PropTypes.func.isRequired,
    recordAnswer: PropTypes.func.isRequired,
    ignoreAnswer: PropTypes.func.isRequired,
    showPanel: PropTypes.func.isRequired,
    cycleInfoDetail: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.answerForm.addEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate() {
    if (this.props.answer.disabled) this.answerForm.focus();
  }

  componentWillUnmount() {
    this.answerForm.removeEventListener('keydown', this.handleKeyDown);
  }

  getMarkClassname = ({ correct, incorrect, valid, marked }) => {
    switch (true) {
      case (marked && !valid): return 'is-invalid';
      case (incorrect): return 'is-marked is-incorrect';
      case (correct): return 'is-marked is-correct';
      default: return '';
    }
  };

  getKeyHandler = (keycode) => ({
    [KEYCODES.ENTER]: this.props.recordAnswer,
    [KEYCODES.SPACE]: this.props.cycleInfoDetail,
    [KEYCODES.N_LOWERCASE]: () => this.props.showPanel('notes'),
    [KEYCODES.F_LOWERCASE]: () => this.props.showPanel('info'),
    [KEYCODES.S_LOWERCASE]: () => this.props.showPanel('synonym'),
    [KEYCODES.BACKTICK]: () => this.props.showPanel('settings'),
    [KEYCODES.I_LOWERCASE]: this.handleIgnore,
    [KEYCODES.BACKSPACE]: this.handleIgnore,
    [KEYCODES.FORWARD_SLASH]: this.handleIgnore,
  }[keycode])

  handleKeyDown = (event) => {
    const action = this.getKeyHandler(event.keyCode);
    if (this.props.answer.disabled && action) {
      blockEvent(event);
      action();
    }
  }

  handleIgnore = () => {
    this.props.ignoreAnswer(this.props.answer.correct);
  }

  handleSubmit = (event) => {
    if (this.props.answer.disabled) {
      this.props.recordAnswer();
    } else if (!this.props.answer.valid) {
      blockEvent(event);
      this.props.checkAnswer();
    }
  }

  render() {
    const { answer, streakName, handleInput, ignoreAnswer } = this.props; // eslint-disable-line no-shadow
    return (
      <Form
        className={this.getMarkClassname(answer)}
        innerRef={(node) => { this.answerForm = node; }}
        onSubmit={this.handleSubmit}
        tabIndex={-1}
      >
        {/* TODO: <StreakAnimation /> */}
        <AnswerInput
          text={answer.input}
          focus={answer.focus}
          streakName={streakName}
          onIgnore={() => ignoreAnswer(answer.correct)}
          onSubmit={this.handleSubmit}
          onChangeInput={handleInput}
          disabled={answer.disabled}
        />
      </Form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  answer: selectAnswer,
  streakName: selectCurrentStreakName,
});

const mapDispatchToProps = (dispatch) => ({
  handleInput: (event) => dispatch(reviewActions.updateAnswerInput({ input: event.target.value })),
  checkAnswer: () => dispatch(reviewActions.checkAnswer()),
  recordAnswer: () => dispatch(reviewActions.recordAnswerRequest()),
  ignoreAnswer: (correctness) => dispatch(reviewActions.markIgnored(correctness)),
  showPanel: (name) => dispatch(reviewActions.showPanel(name)),
  cycleInfoDetail: () => dispatch(reviewActions.cycleInfoDetail()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewAnswer);
