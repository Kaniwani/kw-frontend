import React from 'react';
import PropTypes from 'prop-types';

import * as COLORS from 'shared/styles/colors';

import { Wrapper, Background, Text, Bar } from './styles';

AccuracyBar.propTypes = {
  percent: PropTypes.number,
  color: PropTypes.oneOf(Object.keys(COLORS)),
};

AccuracyBar.defaultProps = {
  percent: 0,
  color: 'purple',
};

/* TODO: animate width, currently no animation */

function AccuracyBar({ percent, color }) {
  return (
    <Wrapper>
      <Background bgColor={color}>
        <Text percent={percent} textShadowColor={color}>{percent}% Accuracy</Text>
        <Bar percent={percent} bgColor={color} />
      </Background>
    </Wrapper>
  );
}

export default AccuracyBar;
