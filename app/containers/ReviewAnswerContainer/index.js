import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
import bind from 'wanakana/bind';
import unbind from 'wanakana/unbind';

import { SRS_RANKS, KEYCODES } from 'shared/constants';
import blockEvent from 'utils/blockEvent';
import ReviewAnswer from 'components/ReviewAnswer';
// import actions from 'containers/App/actions';
// import reviewActions from 'containers/ReviewSession/actions';
// import { selectAnswer, selectCurrentStreakName } from 'containers/ReviewSession/selectors';

// props from selectors
export class ReviewAnswerContainer extends React.Component {
  static propTypes = {
    streakName: PropTypes.oneOf(Object.values(SRS_RANKS)).isRequired,
    answer: PropTypes.shape({
      value: PropTypes.string,
      marked: PropTypes.bool,
      disabled: PropTypes.bool,
      focus: PropTypes.bool,
      correct: PropTypes.bool,
      incorrect: PropTypes.bool,
      valid: PropTypes.bool,
    }),
    checkAnswer: PropTypes.func.isRequired,
    updateAnswer: PropTypes.func.isRequired,
    recordAnswer: PropTypes.func.isRequired,
    ignoreAnswer: PropTypes.func.isRequired,
    showPanel: PropTypes.func.isRequired,
    cycleInfoDetail: PropTypes.func.isRequired,
  }

  // TODO: these could potentially be state
  // have to check sagas carefully though for any hooks
  // passing the state in dispatched actions should be fine though
  // though only interesting one is resetAnswer() when rotating
  static defaultProps = {
    // TODO: proper bool state naming isDisabled, isCorrect etc
    answer: {
      value: '',
      marked: false,
      disabled: false,
      focus: false,
      correct: false,
      incorrect: false,
      valid: true,
    },
  }

  componentDidMount() {
    // could probably use toKana() in handleKeyDown instead?
    // depends on any quirks of IMEMode handling selection and 3char chunks
    bind(this.inputFieldRef);
    this.inputFieldRef.addEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate() {
    if (this.props.answer.focus) {
      this.inputFieldRef.focus();
    }
  }

  componentWillUnmount() {
    this.inputFieldRef.removeEventListener('keydown', this.handleKeyDown);
    unbind(this.inputFieldRef);
  }

  // move up to parent ReviewsPage/Page level?
  // check target isn't synonym form?
  getKeyHandler = (keycode) => ({
    [KEYCODES.ENTER]: this.props.recordAnswer,
    [KEYCODES.SPACE]: this.props.cycleInfoDetail,
    [KEYCODES.N_LOWERCASE]: () => this.props.showPanel('notes'),
    [KEYCODES.F_LOWERCASE]: () => this.props.showPanel('info'),
    [KEYCODES.S_LOWERCASE]: () => this.props.showPanel('synonym'),
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

  handleInput = (event) => {
    this.props.updateAnswer(event.target.value);
  }

  handleIgnore = () => {
    // should really be passing these kinda details from state to sagas in the other handleFuncs
    this.props.ignoreAnswer(this.props.answer.correct);
  }

  handleSubmit = (event) => {
    blockEvent(event);
    if (this.props.answer.disabled) {
      this.props.recordAnswer();
    } else if (!this.props.answer.valid || !this.props.answer.marked) {
      this.props.checkAnswer();
    }
  }

  render() {
    const { answer, streakName } = this.props;
    return (
      <ReviewAnswer
        isMarked={answer.marked}
        isFocused={answer.focus}
        isValid={answer.valid}
        isCorrect={answer.correct}
        isIncorrect={answer.incorrect}
        isDisabled={answer.disabled}
        streakName={streakName}
        handleSubmit={this.handleSubmit}
        handleIgnore={this.handleIgnore}
        handleInput={this.handleInput}
        inputFieldRef={(node) => { this.inputFieldRef = node; }}
        inputFieldValue={answer.value}
      />
    );
  }
}

// const mapStateToProps = createStructuredSelector({
//   answer: selectAnswer,
//   streak: selectCurrentStreak,
// });
//
// const mapDispatchToProps = (dispatch) => ({
//   updateAnswer: (value) => dispatch(reviewActions.updateAnswerInput({ input: value })),
//   checkAnswer: () => dispatch(reviewActions.checkAnswer()),
//   recordAnswer: () => dispatch(reviewActions.recordAnswerRequest()),
//   ignoreAnswer: (correctness) => dispatch(reviewActions.markIgnored(correctness)),
//   showPanel: (name) => dispatch(reviewActions.showPanel(name)),
//   cycleInfoDetail: () => dispatch(globalActions.cycleInfoDetail()),
// });

export default /* connect(mapStateToProps, mapDispatchToProps)(*/ReviewAnswerContainer/* )*/;
