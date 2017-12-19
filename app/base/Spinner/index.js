import React from "react";
import PropTypes from "prop-types";

import { purpleLight } from 'shared/styles/colors';
import { Wrapper, Circles, Circle1, Circle2 } from "./styles";

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
  size: "40px", // or em, rem, percent
  duration: 1000, // ms
  color1: purpleLight,
  color2: purpleLight,
};

export default Spinner;
