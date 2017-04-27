import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';

import Chip from 'components/Chip';
import { Ul } from './styles';

ChipList.propTypes = {
  chips: PropTypes.arrayOf(PropTypes.string).isRequired,
  componentProps: PropTypes.object,
};

ChipList.defaultProps = {
  componentProps: {},
};

function ChipList({ chips, componentProps }) {
  return (
    <Ul>
      {chips.map((text) => <Chip key={cuid()} {...componentProps} >{text}</Chip>)}
    </Ul>
  );
}

export default ChipList;
