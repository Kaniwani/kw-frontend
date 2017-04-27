import React from 'react';
import PropTypes from 'prop-types';

import * as COLORS from 'shared/styles/colors';
import { Li, Span } from './styles';

Chip.propTypes = {
  children: PropTypes.string.isRequired,
  textColor: PropTypes.oneOf(Object.keys(COLORS)),
  bgColor: PropTypes.oneOf(Object.keys(COLORS)),
};

Chip.defaultProps = {
  textColor: 'blackLight',
  bgColor: 'white',
};

function Chip({ children, ...styleProps }) {
  return (
    <Li {...styleProps}>
      <Span>{children}</Span>
    </Li>
  );
}

export default Chip;
