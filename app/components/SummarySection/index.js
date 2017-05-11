import React from 'react';
import PropTypes from 'prop-types';
import { branch, renderComponent } from 'recompose';

import Container from 'layouts/Container';
import Element from 'layouts/Element';

import Placeholder from './Placeholder';
import VocabList from './VocabList';
import RankedVocabLists from './RankedVocabLists';
import { TYPES } from './constants';
import { Title } from './styles';

const hasNoItems = ({ items }) => !items.length;

const withPlaceholder = branch(
  hasNoItems,
  renderComponent(Placeholder),
);

const CriticalList = withPlaceholder(VocabList);
const RankedLists = withPlaceholder(RankedVocabLists);

const getTitleText = (type, count) =>
  type === 'CRITICAL' ?
    `${count} critical items` :
    `${count} answered ${type.toLowerCase()}ly`;

SummarySection.propTypes = {
  type: PropTypes.oneOf(Object.keys(TYPES)).isRequired,
  items: PropTypes.array.isRequired,
  expanded: PropTypes.bool,
};

SummarySection.defaultProps = {
  expanded: false,
};

function SummarySection({ type, items, expanded }) {
  const color = TYPES[type].color;
  return (
    <Container tag="section">
      <Element>
        <Title color={color}>
          {getTitleText(type, items.length)}
        </Title>
      </Element>
      <Element>
        {type === 'CRITICAL' ? (
          <CriticalList
            expanded={expanded}
            type={type}
            items={items}
            color={color}
          />
        ) : (
          <RankedLists
            expanded={expanded}
            type={type}
            items={items}
            color={color}
          />
        )}
      </Element>
    </Container>
  );
}

export default SummarySection;
