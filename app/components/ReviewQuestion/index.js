import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import TagList from 'components/TagList';
import Chip from 'components/Chip';
import {
  Wrapper,
  MeaningWrapper,
  Meaning,
} from './UI';

const Question = ({ meaning, tags }) => (
  <Wrapper>
    <MeaningWrapper>
      <Meaning>{meaning}</Meaning>
    </MeaningWrapper>
    {tags && <TagList items={tags} component={Chip} />}
  </Wrapper>
  );

Question.propTypes = {
  meaning: PropTypes.string.isRequired,
  tags: PropTypes.instanceOf(Immutable.Iterable),
};

export default Question;
