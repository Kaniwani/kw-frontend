import React from 'react';
import PropTypes from 'prop-types';

import { purple } from 'common/styles/colors';
import { Wrapper, Circles, Circle1, Circle2 } from './styles';

const Spinner = (props) => (
  <Wrapper>
    <Circles {...props}>
      <Circle1 />
      <Circle2 />
    </Circles>
  </Wrapper>
);

Spinner.propTypes = {
  size: PropTypes.string,
  duration: PropTypes.number,
  color1: PropTypes.string,
  color2: PropTypes.string,
};

Spinner.defaultProps = {
  size: '2.5rem', // or em, rem, percent
  duration: 1000, // ms
  color1: purple[4],
  color2: purple[4],
};

export default Spinner;
