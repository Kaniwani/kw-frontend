import React from 'react';
import PropTypes from 'prop-types';
import { Sector } from 'recharts';
import { grey, black } from 'common/styles/colors';

renderActiveShape.propTypes = {
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  innerRadius: PropTypes.number.isRequired,
  outerRadius: PropTypes.number.isRequired,
  startAngle: PropTypes.number.isRequired,
  endAngle: PropTypes.number.isRequired,
  percent: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired,
  payload: PropTypes.object.isRequired,
};

function renderActiveShape({
  cx,
  cy,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  payload,
  percent,
}) {
  return (
    <g>
      <text x={cx} y={cy} dy={-2} textAnchor="middle" fill={grey[8]} style={{ fontSize: '.95rem' }}>
        {payload.name}
      </text>
      <text
        x={cx}
        y={cy}
        dx={2}
        dy={16}
        textAnchor="middle"
        fill={black[2]}
        style={{ fontSize: '.95rem', fontWeight: 600 }}
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
}

export default renderActiveShape;
