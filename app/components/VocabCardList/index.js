import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';

import * as COLORS from 'shared/styles/colors';

import VocabCard from 'components/VocabCard';
import { Ul } from './styles';

VocabCardList.propTypes = {
  items: PropTypes.array.isRequired,
  color: PropTypes.oneOf(Object.keys(COLORS)),
};

VocabCardList.defaultProps = {
  color: 'purple',
};

function VocabCardList({ items, color }) {
  return (
    <Ul>
      {/* FIXME: memoize */}
      {items.map(item => (
        <VocabCard
          key={cuid()}
          color={color}
          {...item}
        />
      ))}
    </Ul>
  );
}

export default VocabCardList;
