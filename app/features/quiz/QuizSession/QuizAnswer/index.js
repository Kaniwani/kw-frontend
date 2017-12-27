import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { SRS_RANKS } from 'common/constants';

import quiz from 'features/quiz/actions';
import selectQuizAnswer from 'features/quiz/QuizSession/QuizAnswer/selectors';
import { selectCurrentStreakName } from 'features/quiz/QuizSession/selectors';
import { DebouncedInput } from './DebouncedInput';
import {
  Form,
  AnswerWrapper,
  Label,
  Streak,
  ActionButtons,
  IgnoreButton,
  SubmitButton,
} from './styles';

export class QuizAnswer extends React.Component {
  static propTypes = {
    onIgnore: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    streakName: PropTypes.string,
    value: PropTypes.string,
    isFocused: PropTypes.bool,
    isMarked: PropTypes.bool,
    isValid: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isCorrect: PropTypes.bool,
    isIncorrect: PropTypes.bool,
  };

  static defaultProps = {
    value: '',
    streakName: SRS_RANKS.ZERO,
    isFocused: true,
    isMarked: false,
    isValid: false,
    isDisabled: false,
    isCorrect: false,
    isIncorrect: false,
  };

  componentDidUpdate() {
    if (this.props.isFocused) {
      this.inputFieldRef.focus();
    }
  }

  onChange = (value) => {
    this.props.onUpdate({ value });
  };

  onIgnore = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onIgnore();
  };

  onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onSubmit();
  };

  setInputFieldRef = (node) => {
    this.inputFieldRef = node;
  };

  render() {
    const {
      value,
      isFocused,
      isDisabled,
      isCorrect,
      isIncorrect,
      isMarked,
      isValid,
      streakName,
    } = this.props;
    return (
      <Form
        onSubmit={this.onSubmit}
        marked={isMarked}
        valid={isValid}
        correct={isCorrect}
        incorrect={isIncorrect}
      >
        <AnswerWrapper>
          <Streak streakName={streakName} size="1.15em" />
          <Label htmlFor="answer">Vocabulary reading</Label>
          <DebouncedInput
            setInputFieldRef={this.setInputFieldRef}
            value={value}
            onChange={this.onChange}
            isFocused={isFocused}
            isDisabled={isDisabled}
            isMarked={isMarked}
            isValid={isValid}
          />
          <ActionButtons>
            {isDisabled && (
              <IgnoreButton
                name="CLOSE"
                type="button"
                title="Ignore answer"
                size="1.4em"
                onClick={this.onIgnore}
              />
            )}
            <SubmitButton
              name="ARROW_RIGHT"
              type="submit"
              title="Submit answer"
              size="1.75em"
              onClick={this.onSubmit}
            />
          </ActionButtons>
        </AnswerWrapper>
      </Form>
    );
  }
}

const mapStateToProps = (state, props) => ({
  ...selectQuizAnswer(state, props),
  streakName: selectCurrentStreakName(state, props),
});

const mapDispatchToProps = {
  onUpdate: quiz.answer.update,
  onSubmit: quiz.answer.submit,
  onIgnore: quiz.answer.ignore,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizAnswer);
