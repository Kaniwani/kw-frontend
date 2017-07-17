import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { SRS_RANKS } from 'shared/constants';
import { toKana } from 'wanakana';

import { makeSelectReviewStreakName, selectCurrentId } from 'containers/App/selectors';
import { selectQuizAnswer } from 'containers/QuizPage/selectors';
import quiz from 'containers/QuizPage/actions';

import {
  Form,
  AnswerWrapper,
  Input,
  Label,
  ActionButtons,
  IgnoreButton,
  SubmitButton,
  Streak,
} from './styles';

export class QuizAnswer extends React.PureComponent {
  static propTypes = {
    updateAnswer: PropTypes.func.isRequired,
    submitAnswer: PropTypes.func.isRequired,
    ignoreAnswer: PropTypes.func.isRequired,
    category: PropTypes.string.isRequired,
    streakName: PropTypes.string,
    answer: PropTypes.shape({
      value: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      focus: PropTypes.bool.isRequired,
      isMarked: PropTypes.bool.isRequired,
      isValid: PropTypes.bool.isRequired,
      isDisabled: PropTypes.bool.isRequired,
      isCorrect: PropTypes.bool.isRequired,
      isIncorrect: PropTypes.bool.isRequired,
    }).isRequired,
  }

  static defaultProps = {
    streakName: SRS_RANKS.ONE,
  };

  // NOTE: react-hotkeys might help avoid this so we can use a function + withHandlers
  componentDidUpdate() {
    if (this.props.answer.focus) {
      this.inputFieldRef.focus();
    }
  }

  handleInput = (event) => {
    const { updateAnswer } = this.props;
    // TODO: could allow user to decide in settings if always hiragana or if caps for katakana is ok
    const value = toKana(event.target.value.toLowerCase(), { IMEMode: true });
    updateAnswer({ value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { submitAnswer, category } = this.props;
    submitAnswer({ category });
  }

  handleIgnore = (event) => {
    event.preventDefault();
    const { ignoreAnswer, category } = this.props;
    ignoreAnswer({ category });
  }

  render() {
    const { answer, streakName } = this.props;
    return (
      <Form
        onSubmit={this.handleSubmit}
        tabIndex={-1}
        marked={answer.isMarked}
        valid={answer.isValid}
        correct={answer.isCorrect}
        incorrect={answer.isIncorrect}
      >
        <AnswerWrapper>
          <Streak streakName={streakName} size="1.15em" />
          <Label htmlFor="userAnswer">
            Vocabulary reading
          </Label>
          <Input
            id="userAnswer"
            innerRef={(node) => { this.inputFieldRef = node; }}
            lang="ja"
            type="text"
            focus={answer.focus}
            disabled={answer.isDisabled}
            marked={answer.isMarked}
            valid={answer.isValid}
            onChange={this.handleInput}
            value={answer.value}
            placeholder="答え"
            autoFocus
            autoCapitalize="none"
            autoCorrect="none"
            autoComplete="off"
            spellCheck="false"
          />
          <ActionButtons>
            {answer.isDisabled && (
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

const mapStateToProps = (state, { category }) => ({
  answer: selectQuizAnswer(state),
  streakName: makeSelectReviewStreakName(selectCurrentId(state, { category }))(state),
});

const mapDispatchToProps = {
  updateAnswer: quiz.answer.update,
  submitAnswer: quiz.answer.submit,
  ignoreAnswer: quiz.answer.ignore,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizAnswer);
