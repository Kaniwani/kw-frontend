import React from 'react';
import PropTypes from 'prop-types';
import { branch, renderComponent } from 'recompose';

import VocabList from 'components/VocabList';
import Placeholder from './Placeholder';
import RankedVocabLists from './RankedVocabLists';
import { TYPES, CRITICAL } from './constants';
import { Section, Wrapper, Title } from './styles';

const hasNoItems = ({ items }) => !items.length;
const isCritical = (type) => type === CRITICAL;

const withPlaceholder = branch(
  hasNoItems,
  renderComponent(Placeholder),
);

const CriticalList = withPlaceholder(VocabList);
const RankedLists = withPlaceholder(RankedVocabLists);

const getTitleText = (type, count) =>
  isCritical(type) ?
    `${count} critical items` :
    `${count} answered ${type.toLowerCase()}ly`;

SummarySection.propTypes = {
  type: PropTypes.oneOf(Object.keys(TYPES)).isRequired,
  items: PropTypes.array.isRequired,
  isExpanded: PropTypes.bool,
};

SummarySection.defaultProps = {
  isExpanded: false,
};

function SummarySection({ type, items, isExpanded }) {
  const color = TYPES[type].color;
  return (
    <Section>
      <Wrapper>
        <Title color={color}>
          {getTitleText(type, items.length)}
        </Title>
      </Wrapper>
      <Wrapper>
        {isCritical(type) ? (
          <CriticalList
            isExpanded={isExpanded}
            type={type}
            items={items}
            color={color}
          />
        ) : (
          <RankedLists
            isExpanded={isExpanded}
            type={type}
            items={items}
            color={color}
          />
        )}
      </Wrapper>
    </Section>
  );
}

export default SummarySection;
