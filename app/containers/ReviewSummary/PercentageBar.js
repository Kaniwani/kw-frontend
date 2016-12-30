import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { bgGradient } from 'shared/styles/utils';
import * as COLORS from 'shared/styles/colors';
import { gamma } from 'shared/styles/typography';
import Element from 'components/Element';

const StyledElement = styled(Element)`
  ${bgGradient(`rgba(${COLORS.purpleDark}, 0.1)`, 'left')}
  ${gamma}
  position: relative;
  height: 2.5em;
  border-radius: 3px;
`;

const Text = styled.h1`
  font-size: 1.5em;
  color: white;
  margin: 0;
  z-index: 2;
`;

const Bar = styled.div`
  ${bgGradient(`rgb(${COLORS.purple})`, 'left')}
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  transition: width .8s ease-in-out;
  width: ${(props) => props.width}%; /* TODO: animate reactily, currently no animation */
  z-index: 1;
  color: ${COLORS.white};
`;

const PercentageBar = ({ percent }) => (
  <StyledElement flexRow>
    <Element flexRow flexCenter>
      <Text>{percent}% Accuracy</Text>
    </Element>
    <Bar width={percent} />
  </StyledElement>
);

PercentageBar.propTypes = {
  percent: PropTypes.number,
};

PercentageBar.defaultProps = {
  percent: 0,
};

export default PercentageBar;
