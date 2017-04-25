import React from 'react';
import PropTypes from 'prop-types';
import branch from 'utils/branch';

Ruby.propTypes = {
  furi: PropTypes.string,
  children: PropTypes.string.isRequired,
};

Ruby.defaultProps = {
  furi: '',
};

function Ruby({ furi, children }) {
  return branch(
    furi,
    <ruby><rb>{children}</rb><rt>{furi}</rt></ruby>,
    <span>{children}</span>
  );
}

export default Ruby;
