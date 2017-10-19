import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';

import Ul from 'base/Ul';

const RenderList = (props) => <Ul {...props} plainList />;
const RenderItem = (props) => <li {...props} />;

List.propTypes = {
  items: PropTypes.array.isRequired,
  RenderList: PropTypes.func,
  RenderItem: PropTypes.func,
};

List.defaultProps = {
  RenderList,
  RenderItem,
};

function List({ items, RenderList, RenderItem }) { // eslint-disable-line no-shadow
  return (
    <RenderList>
      {items.map((item) => <RenderItem key={cuid()} {...item} />)}
    </RenderList>
  );
}

export default List;
