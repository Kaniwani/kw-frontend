import React from 'react';
import PropTypes from 'prop-types';

import { greyDark } from 'shared/styles/colors';

const DayTick = ({ x, y, payload }) => payload.value ? (
  <g>
    <text x={x} y={y} dx={0} dy={-10} textAnchor="middle" fill={greyDark} fontSize=".85rem">
      {payload.value}
    </text>
  </g>
) : null;

DayTick.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  payload: PropTypes.object.isRequired,
};

export default DayTick;
