import React from 'react';
import PropTypes from 'prop-types';

import * as COLORS from 'shared/styles/colors';
import { ListItem, RouterLink, Text } from './styles';

VocabChip.propTypes = {
  id: PropTypes.number.isRequired,
  character: PropTypes.string.isRequired,
  color: PropTypes.oneOf(Object.keys(COLORS)),
};

VocabChip.defaultProps = {
  color: 'purple',
};

function VocabChip({ id, character, color, ...props }) {
  return (
    <ListItem bgColor={color} {...props}>
      <RouterLink to={`/vocabulary/entry/${id}`}>
        <Text lang="ja" shadowColor={color}>{ character }</Text>
      </RouterLink>
    </ListItem>
  );
}

export default VocabChip;
