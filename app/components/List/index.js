import React from 'react';
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
  component: React.PropTypes.func.isRequired,
  componentProps: React.PropTypes.object,
  items: React.PropTypes.array,
};

export default List;
