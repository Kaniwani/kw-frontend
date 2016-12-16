import React, { PropTypes } from 'react';
import styled from 'styled-components';

import { bgGradient } from 'shared/styles/utils';
import { purple, purpleDark } from 'shared/styles/colors';


const Wrapper = styled.div`
  ${bgGradient(`rgba(${purpleDark}, 0.1)`, 'left')}
  height: 1.75rem;
  border-radius: 3px;
`;

const Bar = styled.div`
  ${bgGradient(`rgb(${purple})`, 'left')}
  display: block;
  height: 100%;
  transition: width .8s ease-in-out;
  width: ${(props) => props.width}%; /* TODO: animate reactily */
`;

const PercentageBar = ({ percent }) => (
  <Wrapper>
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
