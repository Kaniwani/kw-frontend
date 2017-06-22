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
  isMarked: PropTypes.bool,
  isFocused: PropTypes.bool,
  isValid: PropTypes.bool,
  isCorrect: PropTypes.bool,
  isIncorrect: PropTypes.bool,
  isDisabled: PropTypes.bool,
  streak: PropTypes.string,
};

ReviewAnswer.defaultProps = {
  isValid: true,
  isMarked: false,
  isDisabled: false,
  isCorrect: false,
  isIncorrect: false,
  isFocused: false,
  streak: 'APPRENTICE',
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
  streak,
}) {
  return (
    <Form
      marked={isMarked}
      onSubmit={handleSubmit}
      tabIndex={-1}
      // NOTE: are these three necessary here - perhaps in form values?
      valid={isValid}
      correct={isCorrect}
      incorrect={isIncorrect}
    >
      <AnswerWrapper
        marked={isMarked}
        valid={isValid}
        correct={isCorrect}
        incorrect={isIncorrect}
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
