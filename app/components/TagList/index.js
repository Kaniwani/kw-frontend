import React, { PropTypes } from 'react';
import styled from 'styled-components';
import Immutable from 'immutable';
import { resetList } from 'shared/styles/utils';
import cuid from 'cuid';
import Chip from 'components/Chip';

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

const StyledUl = styled.ul`
  ${resetList}
`;

const TagList = ({ className, items }) => (
  <StyledUl className={className} >
    {items.map((item) => <Chip key={cuid()} item={item} {...selectColor(item)} />)}
  </StyledUl>
);

TagList.propTypes = {
  className: PropTypes.string,
  items: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.instanceOf(Immutable.Iterable),
  ]).isRequired,
};

export default TagList;
