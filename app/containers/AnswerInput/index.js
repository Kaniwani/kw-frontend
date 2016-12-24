import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import kanawana from 'shared/kanawana/index';

import StreakIcon from './StreakIcon';
import SubmitButton from './SubmitButton';
import IgnoreButton from './IgnoreButton';

import { visuallyhidden } from 'shared/styles/utils';
import Input from './Input';
import Wrapper from './Wrapper';
import { updateInput } from './actions';
import { selectInputText } from './selectors';

const Label = styled.label`
  ${visuallyhidden}
`;

export class AnswerInput extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    kanawana.bind(this.inputField);
  }

  componentDidUpdate() {
    if (!this.props.disabled) this.inputField.focus();
  }

  componentWillUnmount() {
    kanawana.unbind(this.inputField);
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
        { disabled && <IgnoreButton onIgnoreClick={onIgnore} />}
        <SubmitButton />
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
