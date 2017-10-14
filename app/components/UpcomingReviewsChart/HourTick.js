import React from 'react';
import PropTypes from 'prop-types';

import { greyDark } from 'shared/styles/colors';

const HourTick = ({ x, y, payload }) => (
  <g transform={`translate(${x},${y})`}>
    <text
      x={0}
      y={0}
      dy={18}
      textAnchor="middle"
      fill={greyDark}
    >
      {payload.value}
    </text>
  </g>
);

HourTick.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  payload: PropTypes.object.isRequired,
};

export default HourTick;
