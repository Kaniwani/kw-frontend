import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';

import Ul from 'base/Ul';

List.propTypes = {
  component: PropTypes.func.isRequired,
  items: PropTypes.array,
  componentProps: PropTypes.object,
};

List.defaultProps = {
  items: [],
  componentProps: {},
};

function List({ items, component, componentProps }) {
  const ComponentToRender = component;

  let content = (<div />);
  // If we have items, render them
  if (items.length) {
    content = items.map((item) => (
      <ComponentToRender key={cuid()} item={item} {...componentProps} />
    ));
  } else {
    // Otherwise render a single component
    content = (<ComponentToRender />);
  }

  return <Ul plainList>{content}</Ul>;
}

export default List;
