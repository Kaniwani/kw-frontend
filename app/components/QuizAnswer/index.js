import React from "react";
import PropTypes from "prop-types";

import { SRS_RANKS } from "shared/constants";

import {
  Form,
  AnswerWrapper,
  Label,
  Input,
  Streak,
  ActionButtons,
  IgnoreButton,
  SubmitButton,
} from "./styles";

export class QuizAnswer extends React.PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onIgnore: PropTypes.func.isRequired,
    streakName: PropTypes.string,
    answerValue: PropTypes.string,
    isFocused: PropTypes.bool,
    isMarked: PropTypes.bool,
    isValid: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isIgnored: PropTypes.bool,
    isCorrect: PropTypes.bool,
    isIncorrect: PropTypes.bool,
  };

  static defaultProps = {
    streakName: SRS_RANKS.ZERO,
    answerValue: "",
    isFocused: true,
    isMarked: false,
    isValid: false,
    isDisabled: false,
    isIgnored: false,
    isCorrect: false,
    isIncorrect: false,
  };

  componentDidUpdate() {
    if (this.props.isFocused) {
      this.inputFieldRef.focus();
    }
  }

  render() {
    const {
      answerValue,
      isFocused,
      isMarked,
      isValid,
      isDisabled,
      isIgnored,
      isCorrect,
      isIncorrect,
      streakName,
      onSubmit,
      onChange,
      onIgnore,
    } = this.props;

    return (
      <Form
        onSubmit={onSubmit}
        marked={isMarked}
        valid={isValid}
        correct={isCorrect}
        incorrect={isIncorrect}
        ignored={isIgnored}
      >
        <AnswerWrapper>
          <Streak streakName={streakName} size="1.15em" />
          <Label htmlFor="userAnswer">Vocabulary reading</Label>
          <Input
            id="userAnswer"
            innerRef={(node) => {
              this.inputFieldRef = node;
            }}
            lang="ja"
            type="text"
            focus={isFocused}
            ignored={isIgnored}
            disabled={isDisabled}
            marked={isMarked}
            valid={isValid}
            onChange={onChange}
            value={answerValue}
            placeholder="答え"
            autoFocus
            autoCapitalize="none"
            autoCorrect="none"
            autoComplete="off"
            spellCheck="false"
          />
          <ActionButtons>
            {isDisabled && (
              <IgnoreButton
                name="CLOSE"
                type="button"
                title="Ignore answer"
                size="1.4em"
                onClick={onIgnore}
              />
            )}
            <SubmitButton
              name="ARROW_RIGHT"
              type="submit"
              title="Submit answer"
              size="1.75em"
              onClick={onSubmit}
            />
          </ActionButtons>
        </AnswerWrapper>
      </Form>
    );
  }
}

export default QuizAnswer;
