import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';

import { Ul } from './styles';

List.propTypes = {
  component: PropTypes.func.isRequired,
  items: PropTypes.array,
  componentProps: PropTypes.object,
  cssStyle: PropTypes.string,
};

List.defaultProps = {
  items: [],
  componentProps: {},
  cssStyle: '',
};

function List({ items, component, componentProps, cssStyle }) {
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

  return <Ul cssStyle={cssStyle}>{content}</Ul>;
}

export default List;
