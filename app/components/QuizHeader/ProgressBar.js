import React from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from "react-motion";

import { Bar, Percentage } from './styles';

ProgressBar.propTypes = {
  value: PropTypes.number,
};

ProgressBar.defaultProps = {
  value: 0,
};

function ProgressBar({ value, ...props }) {
  const percent = Math.min(value, 100); // prevent width going over 100%
  return (
    <Bar {...props}>
      <Motion style={{ percentX: spring(percent) }}>
        {({ percentX }) => <Percentage style={{ width: `${percentX}%` }} />}
      </Motion>
    </Bar>
  );
}

export default ProgressBar;
