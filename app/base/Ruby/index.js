import React from 'react';
import PropTypes from 'prop-types';

Ruby.propTypes = {
  furi: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Ruby.defaultProps = {
  furi: '',
};

function Ruby({ furi, children }) {
  return furi ?
    <ruby lang="ja"><rb>{children}</rb><rt>{furi}</rt></ruby> :
    <span lang="ja">{children}</span>;
}

export default Ruby;
