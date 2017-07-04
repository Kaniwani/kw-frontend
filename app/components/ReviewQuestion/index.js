import React from 'react';
import PropTypes from 'prop-types';

import {
  Wrapper,
  QuestionWrapper,
  Question,
  Tags,
} from './styles';

ReviewQuestion.propTypes = {
  meanings: PropTypes.array.isRequired,
  readings: PropTypes.array.isRequired,
};

function ReviewQuestion({ meanings, readings }) {
  return (
    <Wrapper>
      <QuestionWrapper>
        <Question>{meanings.join(', ')}</Question>
      </QuestionWrapper>
      <Tags tags={readings[0].tags} />
    </Wrapper>
  );
}

export default ReviewQuestion;
