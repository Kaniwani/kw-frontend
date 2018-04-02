import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { transparentize } from 'polished';
import { blue } from 'common/styles/colors';

export const StyledMark = styled.mark`
  color: ${({ color }) => color};
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 2px;
  ${({ pad }) => pad && 'padding: 1px 2px 2px;'};
`;

Mark.propTypes = {
  color: PropTypes.string,
  bgColor: PropTypes.string,
  pad: PropTypes.bool,
};

Mark.defaultProps = {
  color: 'inherit',
  bgColor: transparentize(0.2, blue[1]),
  pad: true,
};

function Mark(props) {
  return <StyledMark {...props} />;
}

export default Mark;
