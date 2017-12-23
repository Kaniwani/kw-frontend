import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';

import VocabLevel from 'components/VocabLevel';
import { Ul } from './styles';

VocabLevelList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(VocabLevel.propTypes)),
};

VocabLevelList.defaultProps = {
  items: [],
};

function VocabLevelList({ items }) {
  // TODO: React.Children.map(CloneElement => add relevant onLock handler) ?
  return (
    <Ul>{items.map((item) => <VocabLevel key={cuid()} {...item} />)}</Ul>
  );
}

export default VocabLevelList;
