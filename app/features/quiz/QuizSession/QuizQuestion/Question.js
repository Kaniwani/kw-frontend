import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

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
          <Spinner color1={white[3]} color2={white[2]} />
        ) : (
          <Fragment>
            <Primary data-question-primary>{primaryMeaning}</Primary>
            {/* Enforce a min-height even if no terms by using japanese space as placeholder */}
            <Secondary data-question-secondary>
              {secondaryMeanings.length ? secondaryMeanings.join(', ') : '　'}
            </Secondary>
          </Fragment>
        )}
      </Meanings>
    </MeaningsWrapper>
  );
}

export default Question;
