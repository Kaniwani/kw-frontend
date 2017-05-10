import React from 'react';
import PropTypes from 'prop-types';

import Container from 'layouts/Container';
import Element from 'layouts/Element';

import VocabList from './VocabList';
import RankedVocabLists from './RankedVocabLists';
import { TYPES } from './constants';
import { Title } from './styles';

const getTitleText = (type, count) =>
  type === 'critical' ?
    `${count} critical items` :
    `${count} answered ${type}ly`;

SummarySection.propTypes = {
  type: PropTypes.oneOf(Object.keys(TYPES)).isRequired,
  items: PropTypes.object.isRequired,
  expanded: PropTypes.bool,
};

SummarySection.defaultProps = {
  expanded: false,
};

function SummarySection({ type, items, expanded }) {
  const color = TYPES[type].color;
  return (
    <section>
      <Element>
        <Title color={color}>
          {getTitleText(type, items.length)}
        </Title>
      </Element>
      <Container>
        {type === 'critical' ? (
          <VocabList
            expanded={expanded}
            type={type}
            items={items}
            color={color}
          />
        ) : (
          <RankedVocabLists
            expanded={expanded}
            type={type}
            items={items}
            color={color}
          />
        )}
      </Container>
    </section>
  );
}

export default SummarySection;
