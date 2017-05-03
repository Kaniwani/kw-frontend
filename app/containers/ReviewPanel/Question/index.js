import React from 'react';
import PropTypes from 'prop-types';

import {
  Wrapper,
  QuestionWrapper,
  Question,
  Tags,
} from './styles';

ReviewQuestion.propTypes = {
  meaning: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
};

function ReviewQuestion({ meaning, tags }) {
  return (
    <Wrapper>
      <QuestionWrapper>
        <Question>{meaning}</Question>
      </QuestionWrapper>
      <Tags tags={tags} />
    </Wrapper>
  );
}

export default ReviewQuestion;
