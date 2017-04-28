import React from 'react';
import PropTypes from 'prop-types';
import * as COLORS from 'shared/styles/colors';
import { StyledDivider } from './styles';

Divider.propTypes = {
  fullWidth: PropTypes.bool,
  fade: PropTypes.bool,
  color: PropTypes.oneOf[Object.keys(COLORS)],
};

Divider.defaultProps = {
  fade: true,
  fullWidth: false,
  color: COLORS.grey,
};

function Divider(props) {
  return <StyledDivider {...props} />;
}

export default Divider;
