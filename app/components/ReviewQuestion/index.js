import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import LoadingIndicator from 'components/LoadingIndicator';
import Wrapper from './Wrapper';
import Meaning from './Meaning';
import TagList from './TagList';
import Chip from 'components/Chip';

const Question = ({ loading, error, meaning, tags }) => {
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
      <Meaning>{content}</Meaning>
      {tags && !!tags.size && <TagList items={tags} component={Chip} />}
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
  tags: PropTypes.instanceOf(Immutable.Iterable),
};

export default Question;
