import React from 'react';
import PropTypes from 'prop-types';

import { greyDark } from 'common/styles/colors';

const DayTick = ({
  x, y, width, height, payload: { value },
}) =>
  value ? (
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
    </g>
  ) : null;

/* eslint-disable react/require-default-props */
DayTick.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  payload: PropTypes.object,
};

export default DayTick;
