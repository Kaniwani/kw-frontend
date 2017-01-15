import React, { PropTypes } from 'react';
import { bind, unbind } from 'kanawana';

import StreakIcon from './StreakIcon';
import SubmitButton from './SubmitButton';
import IgnoreButton from './IgnoreButton';
import { Input, Wrapper, Label, ButtonContainer } from './styles';


export class AnswerInput extends React.Component {
  static propTypes = {
    text: PropTypes.string,
    focus: PropTypes.bool.isRequired,
    streakName: PropTypes.string,
    disabled: PropTypes.bool,
    onChangeInput: PropTypes.func.isRequired,
    onIgnore: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  componentDidMount() {
    bind(this.inputField);
  }

  componentDidUpdate() {
    if (this.props.focus) this.inputField.focus();
  }

  componentWillUnmount() {
    unbind(this.inputField);
  }

  render() {
    const { text, streakName, onIgnore, onSubmit, disabled, onChangeInput } = this.props;
    return (
      <Wrapper>
        <StreakIcon streak={streakName} />
        <Label htmlFor="userAnswer">
          Vocabulary reading
        </Label>
        <Input
          id="userAnswer"
          lang="ja"
          type="text"
          innerRef={(node) => { this.inputField = node; }}
          onChange={onChangeInput}
          value={text}
          disabled={disabled}
          placeholder="答え"
          autoFocus
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          spellCheck="false"
        />
        <ButtonContainer>
          { disabled && <IgnoreButton handleClick={onIgnore} />}
          <SubmitButton handleClick={onSubmit} />
        </ButtonContainer>
      </Wrapper>
    );
  }
}

export default AnswerInput;
