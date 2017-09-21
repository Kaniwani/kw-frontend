import React from 'react';
import PropTypes from 'prop-types';

import { blackLight } from 'shared/styles/colors';

const BarLabel = ({ x, y, width, value }) => value > 0 ? (
  <text x={x} y={y} dy={-4} dx={width / 2} fill={blackLight} fontSize=".8rem" textAnchor="middle">{value}</text>
) : null;

BarLabel.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
};

export default BarLabel;
