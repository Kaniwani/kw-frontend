import React from 'react';
import PropTypes from 'prop-types';

import { greyDark } from 'shared/styles/colors';

const HourTick = ({ x, y, payload }) => (
  <g transform={`translate(${x},${y})`}>
    <text x={0} y={0} dx={5} dy={15} textAnchor="end" fill={greyDark} fontSize=".85rem" transform="rotate(-35)">{payload.value}</text>
  </g>
);

HourTick.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  payload: PropTypes.object.isRequired,
};

export default HourTick;
