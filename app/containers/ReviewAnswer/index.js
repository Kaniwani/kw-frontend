import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
import bind from 'kanawana/bind';
import unbind from 'kanawana/unbind';
import titleCase from 'voca/title_case';

import { SRS_RANKS, KEYCODES } from 'shared/constants';
import blockEvent from 'utils/blockEvent';
// import globalActions from 'containers/App/actions';
// import reviewActions from 'containers/ReviewSession/actions';
// import { selectAnswer, selectCurrentStreakName } from 'containers/ReviewSession/selectors';

import { AnswerWrapper, Input, Form, Label, ActionButtons, IgnoreButton, SubmitButton, StreakIcon } from './styles';

export class ReviewAnswer extends React.Component {
  static propTypes = {
    streak: PropTypes.oneOf(Object.values(SRS_RANKS)).isRequired,
    answer: PropTypes.shape({
      input: PropTypes.string,
      type: PropTypes.string,
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

  // TODO: these could be state
  // have to check sagas carefully though for any hooks
  // passing the state in dispatched actions should be fine though
  // though only interesting one is resetAnswer() when rotating
  static defaultProps = {
    answer: {
      text: '',
      type: '',
      valid: true,
      marked: false,
      correct: false,
      incorrect: false,
    },
  }

  componentDidMount() {
    // could probably use toKana() in handleKeyDown instead?
    // depends on any quirks of IMEMode handling selection and 3char chunks
    bind(this.inputField);
    this.inputField.addEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate() {
    if (this.props.answer.focus) {
      this.inputField.focus();
    }
    // if (this.props.answer.disabled) this.answerForm.focus(); // wha? this was for keyhandling I guess, eww
  }

  componentWillUnmount() {
    this.inputField.removeEventListener('keydown', this.handleKeyDown);
    unbind(this.inputField);
  }

  // move up to parent level?
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
    const { answer, streak } = this.props; // eslint-disable-line no-shadow
    return (
      <Form
        marked={answer.marked}
        onSubmit={this.handleSubmit}
        tabIndex={-1}
        // are these three necessary - perhaps in form values?
        valid={answer.valid}
        correct={answer.correct}
        incorrect={answer.incorrect}
      >
        {/* TODO: <StreakAnimation /> */}
        <AnswerWrapper
          marked={answer.marked}
          valid={answer.valid}
          correct={answer.correct}
          incorrect={answer.incorrect}
        >
          <StreakIcon
            name={streak}
            title={titleCase(streak)}
            size="1.15em"
          />
          <Label htmlFor="userAnswer">
            Vocabulary reading
          </Label>
          <Input
            focus={answer.focus}
            disabled={answer.disabled}
            marked={answer.marked}
            id="userAnswer"
            lang="ja"
            type="text"
            innerRef={(node) => { this.inputField = node; }}
            onChange={this.handleInput}
            value={answer.input}
            placeholder="答え"
            autoFocus // eslint-disable-line jsx-a11y/no-autofocus
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            spellCheck="false"
          />
          <ActionButtons>
            {answer.disabled && (
              <IgnoreButton
                name="CLOSE"
                type="button"
                title="Ignore answer"
                size="1.4em"
                handleClick={this.handleIgnore}
              />
            )}
            <SubmitButton
              name="ARROW_RIGHT"
              type="submit"
              title="Submit answer"
              size="1.75em"
              handleClick={this.handleSubmit}
            />
          </ActionButtons>
        </AnswerWrapper>
      </Form>
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

export default /* connect(mapStateToProps, mapDispatchToProps)(*/ReviewAnswer/* )*/;
