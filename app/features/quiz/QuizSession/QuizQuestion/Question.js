import React from 'react';
import PropTypes from 'prop-types';

import Aux from 'common/components/Aux';
import Spinner from 'common/components/Spinner';
import { white } from 'common/styles/colors';
import { MeaningsWrapper, Meanings, Primary, Secondary } from './styles';

Question.propTypes = {
  primaryMeaning: PropTypes.string.isRequired,
  secondaryMeanings: PropTypes.array,
};

Question.defaultProps = {
  secondaryMeanings: [],
};

export function Question({ primaryMeaning, secondaryMeanings }) {
  return (
    <MeaningsWrapper>
      <Meanings>
        {!primaryMeaning ? (
          <Spinner color1={white[5]} color2={white[2]} />
        ) : (
          <Aux>
            <Primary>{primaryMeaning}</Primary>
            {/* Enforce a min-height even if no terms by using japanese space as placeholder */}
            <Secondary>{secondaryMeanings.length ? secondaryMeanings.join(', ') : '　'}</Secondary>
          </Aux>
        )}
      </Meanings>
    </MeaningsWrapper>
  );
}

export default Question;
