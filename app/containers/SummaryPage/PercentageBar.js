import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { bgGradient, fluidType } from 'shared/styles/utils';
import * as COLORS from 'shared/styles/colors';


const Wrapper = styled.div`
  ${bgGradient(`rgba(${COLORS.purpleDark}, 0.1)`, 'left')}
  ${fluidType(18, 26)}
  position: relative;
  display: flex;
  height: 2.5em;
  border-radius: 3px;
`;

const Text = styled.h1`
  align-self: center;
  font-size: 1.5em;
  color: white;
  margin: 0;
  padding: .1em 1rem;
  z-index: 2;
`;

const Bar = styled.div`
  ${bgGradient(`rgb(${COLORS.purple})`, 'left')}
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  transition: width .8s ease-in-out;
  width: ${(props) => props.width}%; /* TODO: animate reactily */
  z-index: 1;
  color: ${COLORS.white};
`;

const PercentageBar = ({ percent }) => (
  <Wrapper>
    <Text>{percent}% Accuracy</Text>
    <Bar width={percent} />
  </Wrapper>
);

PercentageBar.propTypes = {
  percent: PropTypes.number,
};

PercentageBar.defaultProps = {
  percent: 0,
};

export default PercentageBar;
