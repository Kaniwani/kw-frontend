/**
*
* ReviewAnswer
*
*/

import React from 'react';
import styled from 'styled-components';
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

function ReviewAnswer({ streak, rotateReview }) {
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
      <IgnoreButton />
      <SubmitButton handleClick={rotateReview} />
{/*      <StreakAnimation />*/}
    </Wrapper>
  );
}

ReviewAnswer.propTypes = {
  streak: React.PropTypes.number.isRequired,
  rotateReview: React.PropTypes.func.isRequired,
};

export default ReviewAnswer;
