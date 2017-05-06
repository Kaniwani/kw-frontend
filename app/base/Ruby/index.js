import React from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';


/**
 * Renders a Ruby tag with furigana or a span if no furigana
 * Ideally, lang="ja" should be specified on a parent element.
 */

Ruby.propTypes = {
  furi: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Ruby.defaultProps = {
  furi: '',
};

function Ruby({ furi, children }) {
  return furi ?
    <ruby><rb>{children}</rb><rt>{furi}</rt></ruby> :
    <span>{children}</span>;
}

export default pure(Ruby);
