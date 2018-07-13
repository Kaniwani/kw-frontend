import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bind, unbind } from 'wanakana';

import smoothScrollY from 'common/utils/smoothScrollY';

import quiz from 'features/quiz/actions';
import selectAnswer from 'features/quiz/QuizSession/QuizAnswer/selectors';
import { selectCurrentStreak, selectIsLessonQuiz } from 'features/quiz/QuizSession/selectors';
import { Form, AnswerWrapper, Label, Streak, Input, IgnoreButton, SubmitButton } from './styles';

export class QuizAnswer extends React.Component {
  static propTypes = {
    onIgnore: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    isLessonQuiz: PropTypes.bool.isRequired,
    value: PropTypes.string, // eslint-disable-line react/require-default-props
    streak: PropTypes.number,
    isFocused: PropTypes.bool,
    isMarked: PropTypes.bool,
    isValid: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isCorrect: PropTypes.bool,
    isIncorrect: PropTypes.bool,
    isIgnored: PropTypes.bool,
  };

  static defaultProps = {
    streak: 0,
    isFocused: true,
    isMarked: false,
    isValid: false,
    isDisabled: false,
    isCorrect: false,
    isIncorrect: false,
    isIgnored: false,
  };

  componentDidMount() {
    bind(this.inputFieldRef, { IMEMode: 'toHiragana' });
    // IOS doesn't open keyboard via autofocus so let's give it a poke
    this.inputFieldRef.focus();
  }

  componentDidUpdate() {
    // Answer reset, terminal N fixed etc.
    if (this.inputFieldRef.value !== this.props.value) {
      this.inputFieldRef.value = this.props.value;
    }
    // Input is blurred when disabled,
    // so we need to focus on something for hotkeys in QuizSession
    // 1) addSynonymModal closed -> re-enable hotkeys
    if (this.props.isDisabled && this.props.isFocused) {
      this.formRef.focus();
      // 2) new question, focus answer field
    } else if (this.props.isFocused) {
      this.inputFieldRef.focus();
      smoothScrollY(0, 1000);
      // 3) question answered, input disabled
    } else {
      this.formRef.focus();
    }
  }

  componentWillUnmount() {
    unbind(this.inputFieldRef);
  }

  onIgnore = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onIgnore();
  };

  onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (this.inputFieldRef.value.length) {
      this.props.onSubmit(this.inputFieldRef.value);
    }
  };

  render() {
    const {
      isLessonQuiz,
      isFocused,
      isDisabled,
      isCorrect,
      isIncorrect,
      isIgnored,
      isMarked,
      isValid,
      streak,
    } = this.props;
    return (
      <Form
        innerRef={(node) => {
          this.formRef = node;
        }}
        onSubmit={this.onSubmit}
        marked={isMarked}
        valid={isValid}
        correct={isCorrect}
        incorrect={isIncorrect}
        ignored={isIgnored}
        tabIndex={0}
      >
        <AnswerWrapper>
          {!isLessonQuiz && isDisabled ? (
            <IgnoreButton
              name="CLOSE"
              type="button"
              title="Ignore answer"
              size="1.3em"
              onClick={this.onIgnore}
            />
          ) : (
            <Streak streak={streak} size="1.15em" />
          )}
          <Label htmlFor="answer">Vocabulary reading</Label>
          <Input
            innerRef={(node) => {
              this.inputFieldRef = node;
            }}
            id="answer"
            type="text"
            placeholder="答え"
            focus={isFocused}
            disabled={isDisabled}
            marked={isMarked}
            valid={isValid}
            autoFocus={isFocused}
          />
          <SubmitButton
            name="ARROW_RIGHT"
            type="submit"
            title="Submit answer"
            size="1.75em"
            onClick={this.onSubmit}
          />
        </AnswerWrapper>
      </Form>
    );
  }
}

const mapStateToProps = (state, props) => ({
  ...selectAnswer(state, props),
  streak: selectCurrentStreak(state, props),
  isLessonQuiz: selectIsLessonQuiz(state, props),
});

const mapDispatchToProps = {
  onSubmit: quiz.answer.submit,
  onIgnore: quiz.answer.ignore,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizAnswer);
