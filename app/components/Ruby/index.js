import React from 'react';
import PropTypes from 'prop-types';

Ruby.propTypes = {
  furi: PropTypes.string,
  children: PropTypes.string.isRequired,
};

Ruby.defaultProps = {
  furi: '',
};

function Ruby({ furi, children }) {
  return furi ? (
    <ruby>
      <rb>{children}</rb>
      <rt>{furi}</rt>
    </ruby>
  ) : (
    <span>{children}</span>
  );
}

export default Ruby;
