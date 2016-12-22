import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import cuid from 'cuid';
import Chip from 'components/Chip';
import Ul from 'components/List/Ul';

const selectColor = (item) => {
  if (/common/i.test(item)) {
    return {
      bgColor: 'blue',
      textColor: 'whiteLight',
    };
  }
  if (/jlpt/i.test(item)) {
    return {
      bgColor: 'tan',
    };
  }
  return {};
};

const TagList = ({ className, items }) => (
  <Ul className={className} >
    {items.map((item) => (
      <Chip key={cuid()} item={item} {...selectColor(item)} />
    ))}
  </Ul>
);

TagList.propTypes = {
  className: PropTypes.string,
  items: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.instanceOf(Immutable.Iterable),
  ]).isRequired,
};

export default TagList;
