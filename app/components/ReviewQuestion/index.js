import React, { PropTypes } from 'react';
import LoadingIndicator from 'components/LoadingIndicator';
import Wrapper from './Wrapper';
import Meaning from './Meaning';

const Question = ({ loading, error, meaning }) => {
  let question = meaning;

  // Show a loading indicator when we're loading
  if (loading) {
    question = (<LoadingIndicator />);
  // Show an error if there is one
  } else if (error !== false) {
    question = `Something went wrong: "${error}". Please contact us or try again!`;
  // If we're not loading, don't have an error and there is review data, show the review data
  } else if (meaning.length) {
    question = meaning;
  }

  return (
    <Wrapper>
      <Meaning>{ question }</Meaning>
    </Wrapper>
  );
};

Question.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  meaning: PropTypes.string.isRequired,
};

export default Question;
