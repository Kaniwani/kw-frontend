/**
*
* ProgressBar
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { whiteLight, blackLight } from 'shared/styles/colors';

const Bar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background-color: rgb(${blackLight});
  opacity: .75;
  overflow: hidden;
`;

const Percentage = styled.span`
  display: block;
  background-color: rgb(${whiteLight});
  transition: width .15s ease-out;
  width: ${(props) => props.value}%;
  height: 100%;
`;

function ProgressBar({ value }) {
  return (
    <Bar>
      <Percentage value={value} />
    </Bar>
  );
}

ProgressBar.propTypes = {
  value: PropTypes.number,
};

export default ProgressBar;
