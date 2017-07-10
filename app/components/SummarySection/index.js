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
    `${count} critical ${pluralize('item', count)}` :
    `${count} ${name.toLowerCase()} ${pluralize('item', count)}`;

SummarySection.propTypes = {
  summaryType: PropTypes.oneOf(Object.keys(TYPES)).isRequired,
  ids: PropTypes.array.isRequired,
};

function SummarySection({ summaryType, ids }) {
  const color = TYPES[summaryType].color;
  return (
    <Section>
      <Wrapper>
        <Title color={color}>
          {getTitleText(summaryType, ids.length)}
        </Title>
      </Wrapper>
      <Wrapper>
        <RankedVocabLists color={color} ids={ids} summaryType={summaryType} />
      </Wrapper>
    </Section>
  );
}

export default SummarySection;
