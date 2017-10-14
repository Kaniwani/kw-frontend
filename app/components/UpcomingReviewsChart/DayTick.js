import React from 'react';
import PropTypes from 'prop-types';

import { greyDark, grey } from 'shared/styles/colors';

const DayTick = ({ x, y, width, height, payload: { value } }) => value ? (
  <g>
    <text
      width={width}
      height={height}
      x={x}
      y={y}
      dx={0}
      dy={-10}
      textAnchor="middle"
      fill={greyDark}
      fontSize=".85rem"
    >
      {value}
    </text>
    {/* manually render a reference line */}
    <line
      x1={x}
      y1={y - 6}
      x2={x}
      y2={y + 2}
      stroke={grey}
      strokeWidth={1.5}
      fill="none"
    />
  </g>
) : null;

DayTick.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  payload: PropTypes.object.isRequired,
};

export default DayTick;
