import React, { PropTypes } from 'react';
import LoadingIndicator from 'components/LoadingIndicator';
import Wrapper from './Wrapper';
import Meaning from './Meaning';

const Question = ({ loading, error, meaning }) => {
  let content = meaning;

  // Show a loading indicator when we're loading
  if (loading) {
    content = (<LoadingIndicator />);
  // Show an error if there is one
  } else if (error !== false) {
    content = `Something went wrong: "${error.msg}". Please contact us or try again!`;
  // If we're not loading, don't have an error and there is review data, show the review data
  } else if (meaning.length) {
    content = meaning;
  }

  return (
    <Wrapper>
      <Meaning>{ content }</Meaning>
    </Wrapper>
  );
};

Question.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]).isRequired,
  meaning: PropTypes.string.isRequired,
};

export default Question;
