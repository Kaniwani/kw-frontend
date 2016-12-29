import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import styled from 'styled-components';
import { resetList } from 'shared/styles/utils';
import cuid from 'cuid';

const Ul = styled.ul`
  ${resetList}
`;

function List({ items, className, component, componentProps }) {
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

  return <Ul className={className}>{content}</Ul>;
}

List.propTypes = {
  component: PropTypes.func.isRequired,
  componentProps: PropTypes.object,
  className: PropTypes.string,
  items: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.instanceOf(Immutable.Iterable),
  ]),
};

export default List;
