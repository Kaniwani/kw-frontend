import React from 'react';
import PropTypes from 'prop-types';

import {
  MeaningsWrapper,
  Meanings,
  Primary,
  Secondary,
} from './styles';

Question.propTypes = {
  primaryMeaning: PropTypes.string.isRequired,
  secondaryMeanings: PropTypes.array,
};

Question.defaultProps = {
  secondaryMeanings: [],
};

function Question({ primaryMeaning, secondaryMeanings }) {
  return (
    <MeaningsWrapper>
      <Meanings>
        <Primary>{primaryMeaning}</Primary>
        {/* Enforce a min-height even if no terms by using japanese space as placeholder */}
        <Secondary>{secondaryMeanings.length ? secondaryMeanings.join(', ') : '　'}</Secondary>
      </Meanings>
    </MeaningsWrapper>
  );
}

export default Question;
