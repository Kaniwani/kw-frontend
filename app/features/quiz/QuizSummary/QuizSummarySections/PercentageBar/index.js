import React from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';

import calculatePercentage from 'common/utils/calculatePercentage';
import { purple } from 'common/styles/colors';

import { Wrapper, Background, Text, Bar } from './styles';

PercentageBar.propTypes = {
  count: PropTypes.number,
  total: PropTypes.number,
  color: PropTypes.string,
  renderLabel: PropTypes.func,
};

PercentageBar.defaultProps = {
  count: 0,
  total: 100,
  color: purple[5],
  renderLabel: ({ percent }) => `${percent}% Accuracy`,
};

function PercentageBar({ count, total, color, renderLabel }) {
  const percent = calculatePercentage(count, total);
  return (
    <Wrapper color={color}>
      <Background>
        <Text percent={percent}>{renderLabel({ count, total, percent })}</Text>
        <Motion defaultStyle={{ percentX: 0 }} style={{ percentX: spring(percent) }}>
          {({ percentX }) => (
            <Bar style={{ backgroundColor: color || color, width: `${percentX}%` }} />
          )}
        </Motion>
      </Background>
    </Wrapper>
  );
}

export default PercentageBar;
