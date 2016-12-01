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
import { changeInput } from './actions';
import {
  selectInputText,
  selectInputDisabled,
  selectAnswerMatches,
  selectAnswerMarked,
  selectAnswerValid,
} from './selectors';

const Label = styled.label`
  ${visuallyhidden}
`;

export class AnswerInput extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    kanawana.bind(this.inputField);
  }
  componentWillUnmount() {
    kanawana.unbind(this.inputField);
  }
  render() {
    const { text, inputDisabled, marked, valid, matches, onChangeInput } = this.props;
    return (
      <Wrapper marked={marked} valid={valid} matches={matches} >
        <Label htmlFor="userAnswer">
          Vocabulary reading
        </Label>
        <Input
          innerRef={(node) => { this.inputField = node; }}
          id="userAnswer"
          value={text}
          onChange={onChangeInput}
          lang="ja"
          type="text"
          disabled={inputDisabled}
          placeholder="答え"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck="false"
          autoComplete="off"
        />
      </Wrapper>
    );
  }
}

AnswerInput.propTypes = {
  text: PropTypes.string,
  onChangeInput: PropTypes.func.isRequired,
  inputDisabled: PropTypes.bool,
  marked: PropTypes.bool,
  valid: PropTypes.bool,
  matches: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  text: selectInputText(),
  marked: selectAnswerMarked(),
  valid: selectAnswerValid(),
  matches: selectAnswerMatches(),
  inputDisabled: selectInputDisabled(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeInput: (event) => dispatch(changeInput(event.target.value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AnswerInput);
