import React from 'react';
import PropTypes from 'prop-types';
import titleCase from 'voca/title_case';

import {
  Form,
  AnswerWrapper,
  Input,
  Label,
  ActionButtons,
  IgnoreButton,
  SubmitButton,
  StreakIcon,
} from './styles';

ReviewAnswer.propTypes = {
  inputFieldRef: PropTypes.func.isRequired,
  inputFieldValue: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleIgnore: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  isMarked: PropTypes.bool.isRequired,
  isFocused: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  isCorrect: PropTypes.bool.isRequired,
  isIncorrect: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  streakName: PropTypes.string.isRequired,
};

function ReviewAnswer({
  inputFieldValue,
  inputFieldRef,
  handleSubmit,
  handleIgnore,
  handleInput,
  isMarked,
  isFocused,
  isValid,
  isCorrect,
  isIncorrect,
  isDisabled,
  streakName,
}) {
  return (
    <Form
      onSubmit={handleSubmit}
      tabIndex={-1}
      marked={isMarked}
      valid={isValid}
      correct={isCorrect}
      incorrect={isIncorrect}
    >
      <AnswerWrapper>
        <StreakIcon
          name={streakName}
          title={titleCase(streakName)}
          size="1.15em"
        />
        <Label htmlFor="userAnswer">
          Vocabulary reading
        </Label>
        <Input
          focus={isFocused}
          disabled={isDisabled}
          marked={isMarked}
          id="userAnswer"
          lang="ja"
          type="text"
          innerRef={inputFieldRef}
          onChange={handleInput}
          value={inputFieldValue}
          placeholder="答え"
          autoFocus // eslint-disable-line jsx-a11y/no-autofocus
          autoCapitalize="off"
          autoCorrect="off"
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
              handleClick={handleIgnore}
            />
          )}
          <SubmitButton
            name="ARROW_RIGHT"
            type="submit"
            title="Submit answer"
            size="1.75em"
            handleClick={handleSubmit}
          />
        </ActionButtons>
      </AnswerWrapper>
    </Form>
  );
}

export default ReviewAnswer;
