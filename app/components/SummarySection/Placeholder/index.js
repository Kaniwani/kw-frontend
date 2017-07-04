import React from 'react';
import PropTypes from 'prop-types';

import { PLACEHOLDERS } from './constants';
import { Heading } from './styles';

Placeholder.propTypes = {
  category: PropTypes.oneOf(Object.keys(PLACEHOLDERS)).isRequired,
};

function Placeholder({ category }) {
  return (
    <Heading>
      <span lang="ja">{PLACEHOLDERS[category].text}</span>
      <span>{PLACEHOLDERS[category].kaomoji}</span>
    </Heading>
  );
}

export default Placeholder;
