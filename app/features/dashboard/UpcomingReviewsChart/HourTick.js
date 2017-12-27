import React from 'react';
import PropTypes from 'prop-types';

import { greyDark } from 'common/styles/colors';

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

/* eslint-disable react/require-default-props */
HourTick.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  payload: PropTypes.object,
};

export default HourTick;
