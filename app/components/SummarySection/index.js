import React from 'react';
import PropTypes from 'prop-types';

import pluralize from 'utils/pluralize';
import RankedVocabLists from './RankedVocabLists';
import { Section, Wrapper, Title } from './styles';

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
};

function SummarySection({ summaryType, ids }) {
  const color = TYPES[summaryType].color;
  return (
    <Section>
      <Title color={color}>{getTitleText(summaryType, ids.length)}</Title>
      <RankedVocabLists color={color} ids={ids} summaryType={summaryType} />
    </Section>
  );
}

export default SummarySection;
