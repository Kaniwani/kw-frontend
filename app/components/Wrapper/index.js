import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { wrapperGutter } from 'shared/styles/layout';

const StyledDiv = styled.div`
  ${(props) => props.padding ? wrapperGutter : ''}
`;

const Wrapper = ({ children, withPadding }) => (
  <StyledDiv padding={withPadding}>
    {children}
  </StyledDiv>
  );

Wrapper.propTypes = {
  withPadding: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,

};

Wrapper.defaultProps = {
  withPadding: true,
};

export default Wrapper;
