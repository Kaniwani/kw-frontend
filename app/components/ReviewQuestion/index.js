import React, { PropTypes } from 'react';
import Wrapper from './Wrapper';
import Meaning from './Meaning';

const Question = ({ meaning }) => (
  <Wrapper>
    <Meaning>{ meaning }</Meaning>
  </Wrapper>
);

Question.propTypes = {
  meaning: PropTypes.string.isRequired,
};

export default Question;
