import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { SRS_RANKS } from 'shared/constants';
import { toKana } from 'wanakana';

import { makeSelectReviewStreakName, selectCurrentId } from 'containers/App/selectors';
import { selectQuizAnswer } from 'containers/SessionPage/selectors';

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
    handleSubmit: PropTypes.func.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    handleIgnore: PropTypes.func.isRequired,
    streakName: PropTypes.string,
    answer: PropTypes.shape({
      isMarked: PropTypes.bool.isRequired,
      isFocused: PropTypes.bool.isRequired,
      isValid: PropTypes.bool.isRequired,
      isCorrect: PropTypes.bool.isRequired,
      isIncorrect: PropTypes.bool.isRequired,
      isDisabled: PropTypes.bool.isRequired,
    }).isRequired,
  }

  static defaultProps = {
    streakName: SRS_RANKS.ONE,
  };

  // NOTE: was used after rotating answer to set focused - but should probably do in reducer/logic instead
  // componentDidUpdate() {
  //   if (this.props.answer.isFocused) {
  //     this.inputFieldRef.focus();
  //   }
  // }

  handleInput = (event) => {
    // TODO: could allow user to decide in settings if always hiragana or if caps for katakana is ok
    const value = toKana(event.target.value.toLowerCase(), { IMEMode: true });
    this.props.handleUpdate({ value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleSubmit();
  }

  handleIgnore = (event) => {
    event.preventDefault();
    this.props.handleIgnore();
  }

  // handleIgnore = () => {
  //   // should really be passing these kinda details from state to sagas in the other handleFuncs
  //   this.props.ignoreAnswer(/* this.props.answer.isCorrect*/);
  // }
  //
  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   const { answer, checkAnswer } = this.props;
  //   // FIXME: move to logic!
  //   // this.props.checkAnswer() // getState() in logic for answer deets
  //   if (answer.isDisabled) {
  //     this.props.recordAnswer();
  //   } else if (!answer.isValid || !answer.isMarked) {
  //     this.props.checkAnswer();
  //   }
  // }

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
            focus={answer.isFocused}
            disabled={answer.isDisabled}
            marked={answer.isMarked}
            id="userAnswer"
            lang="ja"
            type="text"
            onChange={this.handleInput}
            value={answer.value}
            placeholder="答え"
            autoFocus // eslint-disable-line jsx-a11y/no-autofocus
            autoCapitalize="off"
            autoCorrect="off"
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

const mapStateToProps = (state, { category }) => {
  const id = selectCurrentId(state, { category });
  return {
    streakName: makeSelectReviewStreakName(id)(state),
    answer: selectQuizAnswer(state),
  };
};

export default connect(mapStateToProps)(QuizAnswer);
