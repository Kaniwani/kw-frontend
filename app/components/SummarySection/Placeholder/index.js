import React from 'react';
import PropTypes from 'prop-types';

import { PLACEHOLDERS } from './constants';
import { Heading } from './styles';

Placeholder.propTypes = {
  type: PropTypes.oneOf(Object.keys(PLACEHOLDERS)).isRequired,
};

function Placeholder({ type }) {
  return (
    <Heading>
      <span lang="ja">{PLACEHOLDERS[type].text}</span>
      <span>{PLACEHOLDERS[type].kaomoji}</span>
    </Heading>
  );
}

export default Placeholder;
