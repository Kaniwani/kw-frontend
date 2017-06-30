import React from 'react';
import PropTypes from 'prop-types';

import {
  Wrapper,
  QuestionWrapper,
  Question,
  Tags,
} from './styles';

ReviewQuestion.propTypes = {
  meanings: PropTypes.array,
  tags: PropTypes.array,
};

ReviewQuestion.defaultProps = {
  meanings: ['Default', 'Meanings'],
  tags: ['JLPT N1', 'Common', 'Uncommon', 'Intransitive verb', 'Godan verb', 'Noun', 'Suru verb', 'Transitive verb', 'Ichidan verb', 'Suffix'],
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
