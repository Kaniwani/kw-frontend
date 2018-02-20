import React from 'react';
import PropTypes from 'prop-types';
import { transparentize } from 'polished';
import { blue } from 'common/styles/colors';

import { StyledMark } from './styles';

Mark.propTypes = {
  color: PropTypes.string,
  bgColor: PropTypes.string,
};

Mark.defaultProps = {
  bgColor: transparentize(0.2, blue[4]),
  color: 'inherit',
};

function Mark({ color, bgColor, ...props }) {
  return <StyledMark color={color} bgColor={bgColor} {...props} />;
}

export default Mark;
