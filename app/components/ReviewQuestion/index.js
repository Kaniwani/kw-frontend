/**
*
* ReviewQuestion
*
*/

import React from 'react';
import Wrapper from './Wrapper';

function ReviewQuestion({ question }) {
  return (
    <Wrapper>
      <h1>{question}</h1>
    </Wrapper>
  );
}

ReviewQuestion.propTypes = {
  question: React.PropTypes.string.isRequired,
};

export default ReviewQuestion;
