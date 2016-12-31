import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import {
  Wrapper,
  MeaningWrapper,
  Meaning,
  Tags,
} from './styles';

const Question = ({ meaning, tags }) => (
  <Wrapper>
    <MeaningWrapper>
      <Meaning>{meaning}</Meaning>
    </MeaningWrapper>
    {tags && <Tags items={tags} />}
  </Wrapper>
  );

Question.propTypes = {
  meaning: PropTypes.string.isRequired,
  tags: PropTypes.instanceOf(Immutable.Iterable),
};

export default Question;
