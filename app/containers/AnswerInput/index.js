/*
 *
 * AnswerInput
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import { visuallyhidden } from 'shared/styles/utils';
import { selectInputText } from './selectors';

const Label = styled.label`
  ${visuallyhidden}
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 0;
  margin: 0;
  outline: none;
  border: 0;
  background-color: #fafafa;
  box-shadow: inset 0 3px 20px -8px rgba(59,59,59,.25);
  font-size: calc(22px + 28 * ((100vw - 300px) / 1700));
  line-height: 2.5;
  text-align: center;
  transition: all .1s ease-out;
`;

export class AnswerInput extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Label htmlFor="userAnswer">
          Vocabulary reading
        </Label>
        <Input
          id="userAnswer"
          value={this.props.text}
          lang="ja"
          type="text"
          placeholder="答え"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck="false"
          autoComplete="off"
        />
      </div>
    );
  }
}

AnswerInput.propTypes = {
  text: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  text: selectInputText(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AnswerInput);
