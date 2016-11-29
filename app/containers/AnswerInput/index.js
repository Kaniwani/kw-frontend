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
import { selectInputText } from './selectors';
import { changeInput } from './actions';

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
    const { text, onChangeInput } = this.props;
    return (
      <div>
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
  onChangeInput: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  text: selectInputText(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeInput: (evt) => dispatch(changeInput(evt.target.value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AnswerInput);
