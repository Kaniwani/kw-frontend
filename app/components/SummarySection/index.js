import React from 'react';
import PropTypes from 'prop-types';
import { branch, renderComponent } from 'recompose';

import VocabList from 'components/VocabList';
import Placeholder from './Placeholder';
import RankedVocabLists from './RankedVocabLists';
import { Section, Wrapper, Title } from './styles';

const CATEGORIES = {
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

const hasNoItems = ({ items }) => !items.length;
const isCritical = (category) => category === 'CRITICAL';

const withPlaceholder = branch(
  hasNoItems,
  renderComponent(Placeholder),
);

const CriticalList = withPlaceholder(VocabList);
const RankedLists = withPlaceholder(RankedVocabLists);

const getTitleText = (category, count) =>
  isCritical(category) ?
    `${count} critical items` :
    `${count} answered ${category.toLowerCase()}ly`;

SummarySection.propTypes = {
  category: PropTypes.oneOf(Object.keys(CATEGORIES)).isRequired,
  items: PropTypes.array.isRequired,
  isExpanded: PropTypes.bool,
};

SummarySection.defaultProps = {
  isExpanded: false,
};

function SummarySection({ category, items, isExpanded }) {
  const color = CATEGORIES[category].color;
  return (
    <Section>
      <Wrapper>
        <Title color={color}>
          {getTitleText(category, items.length)}
        </Title>
      </Wrapper>
      <Wrapper>
        {isCritical(category) ? (
          <CriticalList
            isExpanded={isExpanded}
            category={category}
            items={items}
            color={color}
          />
        ) : (
          <RankedLists
            isExpanded={isExpanded}
            category={category}
            items={items}
            color={color}
          />
        )}
      </Wrapper>
    </Section>
  );
}

export default SummarySection;
