import React from 'react';
import PropTypes from 'prop-types';

import * as COLORS from 'shared/styles/colors';
import { Li, Span } from './styles';

Chip.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(Object.keys(COLORS)),
  bgColor: PropTypes.oneOf(Object.keys(COLORS)),
};

Chip.defaultProps = {
  color: 'blackLight',
  bgColor: 'white',
};

function Chip({ color, bgColor, children, ...props }) {
  return (
    <Li color={color} bgColor={bgColor} {...props} >
      <Span>{children}</Span>
    </Li>
  );
}

export default Chip;
