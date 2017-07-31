import React from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';

import RankedVocabLists from './RankedVocabLists';
import { Section, Title } from './styles';

const TYPES = {
  CORRECT: {
    color: 'green',
  },
  INCORRECT: {
    color: 'red',
  },
  CRITICAL: {
    color: 'orange',
  },
};

const getTitleText = (name, count) =>
  name === 'CRITICAL' ?
    `${count} critical` :
    `${count} ${name.toLowerCase()}`;

SummarySection.propTypes = {
  summaryType: PropTypes.oneOf(Object.keys(TYPES)).isRequired,
  ids: PropTypes.array.isRequired,
  cardsExpanded: PropTypes.bool.isRequired,
};

function SummarySection({ summaryType, ids, cardsExpanded }) {
  const color = TYPES[summaryType].color;
  return (
    <Section>
      <Title color={color}>{getTitleText(summaryType, ids.length)}</Title>
      <RankedVocabLists
        color={color}
        ids={ids}
        summaryType={summaryType}
        cardsExpanded={cardsExpanded}
      />
    </Section>
  );
}

export default pure(SummarySection);
