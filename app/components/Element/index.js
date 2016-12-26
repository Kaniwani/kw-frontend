import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { elementGutter } from 'shared/styles/layout';

const StyledDiv = styled.div`
  ${(props) => props.padding ? elementGutter : ''}
`;

const Element = ({ children, withPadding }) => (
  <StyledDiv padding={withPadding}>
    {children}
  </StyledDiv>
);

Element.propTypes = {
  withPadding: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,

};

Element.defaultProps = {
  withPadding: true,
};

export default Element;
