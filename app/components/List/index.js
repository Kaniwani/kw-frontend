import React, { PropTypes } from 'react';
import cuid from 'cuid';

import Ul from './Ul';

function List({ items, component, componentProps }) {
  const ComponentToRender = component;
  let content = (<div />);

  // If we have items, render them
  if (items) {
    content = items.map((item) => (
      <ComponentToRender key={cuid()} item={item} {...componentProps} />
    ));
  } else {
    // Otherwise render a single component
    content = (<ComponentToRender />);
  }

  return <Ul>{content}</Ul>;
}

List.propTypes = {
  component: PropTypes.func.isRequired,
  componentProps: PropTypes.object,
  items: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
};

export default List;
