/*
 *
 * AnswerInput
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import kanawana from 'shared/kanawana/index';

import { visuallyhidden } from 'shared/styles/utils';
import Input from './Input';
import Wrapper from './Wrapper';
import { updateInput } from './actions';
import {
  selectInputText,
} from './selectors';

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
    const { text, disabled, marked, valid, matches, onChangeInput } = this.props;
    return (
      <Wrapper
        marked={marked}
        valid={valid}
        matches={matches}
      >
        <Label htmlFor="userAnswer">
          Vocabulary reading
        </Label>
        <Input
          innerRef={(node) => { this.inputField = node; }}
          onChange={onChangeInput}
          value={text}
          disabled={disabled}
          lang="ja"
          type="text"
          placeholder="答え"
          autoFocus
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          spellCheck="false"
        />
      </Wrapper>
    );
  }
}

AnswerInput.propTypes = {
  text: PropTypes.string.isRequired,
  onChangeInput: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  marked: PropTypes.bool.isRequired,
  valid: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.null,
  ]),
  matches: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  text: selectInputText(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeInput: (event) => dispatch(updateInput(event.target.value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AnswerInput);
