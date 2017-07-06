import React from 'react';
import PropTypes from 'prop-types';

import { Bar, Percentage } from './styles';

ProgressBar.propTypes = {
  value: PropTypes.number,
};

ProgressBar.defaultProps = {
  value: 0,
};


function ProgressBar({ value }) {
  return (
    <Bar>
      <Percentage value={value} />
    </Bar>
  );
}

export default ProgressBar;
