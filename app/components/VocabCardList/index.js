import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';

import * as COLORS from 'shared/styles/colors';

import VocabCard from 'components/VocabCard';
import { Ul } from './styles';

VocabCardList.propTypes = {
  ids: PropTypes.array.isRequired,
  color: PropTypes.oneOf(Object.keys(COLORS)),
};

VocabCardList.defaultProps = {
  color: 'purple',
};

function VocabCardList({ ids, color }) {
  return (
    <Ul>
      {ids.map((id) => <VocabCard key={cuid()} color={color} id={id} />)}
    </Ul>
  );
}

export default VocabCardList;
