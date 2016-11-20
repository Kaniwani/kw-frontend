/**
*
* ReviewAnswer
*
*/

import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectCurrentStreak,
} from 'containers/Review/selectors';

import {
  markCorrect,
  markIncorrect,
  markIgnored,
} from 'containers/Review/actions';

import StreakIcon from './StreakIcon';
import IgnoreButton from './IgnoreButton';
import SubmitButton from './SubmitButton';
import { visuallyhidden } from 'shared/styles/utils';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
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

const Label = styled.label`
  ${visuallyhidden}
`;

class ReviewAnswer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { streak, checkAnswer, ignoreAnswer } = this.props;

    return (
      <Wrapper>
        <StreakIcon streak={streak} />
        <Label htmlFor="userAnswer">
          Vocabulary reading
        </Label>
        <Input
          id="userAnswer"
          lang="ja"
          type="text"
          placeholder="答え"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck="false"
          autoComplete="off"
        />
        <IgnoreButton onIgnoreClick={ignoreAnswer} />
        <SubmitButton onSubmit={checkAnswer} />
        {/*      <StreakAnimation />*/}
      </Wrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  streak: selectCurrentStreak(),
});

function mapDispatchToProps(dispatch) {
  return {
    // TODO: dispatch(checkAnswer())
    checkAnswer: () => dispatch(Math.random() * 100 > 25 ? markCorrect() : markIncorrect()),
    ignoreAnswer: () => dispatch(markIgnored()),
  };
}

ReviewAnswer.propTypes = {
  streak: React.PropTypes.number,
  checkAnswer: React.PropTypes.func.isRequired,
  ignoreAnswer: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewAnswer);
