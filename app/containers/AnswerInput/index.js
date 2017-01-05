import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bind, unbind } from 'kanawana';

import StreakIcon from './StreakIcon';
import SubmitButton from './SubmitButton';
import IgnoreButton from './IgnoreButton';

import { Input, Wrapper, Label, ButtonContainer } from './styles';
import { updateInput } from './actions';
import { selectInputText } from './selectors';

export class AnswerInput extends React.Component {
  componentDidMount() {
    bind(this.inputField);
  }

  componentDidUpdate() {
    if (!this.props.disabled) this.inputField.focus();
  }

  componentWillUnmount() {
    unbind(this.inputField);
  }

  render() {
    const { text, streakName, onIgnore, disabled, onChangeInput } = this.props;
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
          { disabled && <IgnoreButton onIgnoreClick={onIgnore} />}
          <SubmitButton />
        </ButtonContainer>
      </Wrapper>
    );
  }
}

AnswerInput.propTypes = {
  text: PropTypes.string.isRequired,
  onChangeInput: PropTypes.func.isRequired,
  onIgnore: PropTypes.func.isRequired,
  streakName: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  text: selectInputText(),
});

const mapDispatchToProps = (dispatch) => ({
  onChangeInput: (event) => dispatch(updateInput(event.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AnswerInput);
