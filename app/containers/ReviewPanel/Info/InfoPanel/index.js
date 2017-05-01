import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';

import { Wrapper } from '../styles';

InfoPanel.propTypes = {
  reviewEntry: PropTypes.object.isRequired,
  detailLevel: PropTypes.string.isRequired,
};

const itemList = ({ items, ...props }) => items.map((item) => <InfoPanel key={cuid()} item={item} {...props} />);

function InfoPanel({
  detailLevel,
  reviewEntry: {
    id,
    vocabulary: {
      readings,
      synonyms,
    },
  },
}) {
  return (
    <Wrapper detailLevel={detailLevel} >
      {readings && itemList({ items: readings, category: 'Reading', id, detailLevel })}
      {synonyms && itemList({ items: synonyms, category: 'Synonym', detailLevel })}
    </Wrapper>
  );
}
