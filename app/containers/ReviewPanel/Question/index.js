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
  tags: PropTypes.array.isRequired,
};

function ReviewQuestion({ meanings, tags }) {
  return (
    <Wrapper>
      <QuestionWrapper>
        <Question>{meanings.join(', ')}</Question>
      </QuestionWrapper>
      <Tags tags={tags} />
    </Wrapper>
  );
}

export default ReviewQuestion;
