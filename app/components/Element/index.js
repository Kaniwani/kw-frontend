import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { elementGutter, fullRowElement } from 'shared/styles/layout';

const StyledDiv = styled.div`
  ${(props) => props.fullRow ? fullRowElement : elementGutter}
`;

const Element = ({ children, fullRow }) => (
  <StyledDiv fullRow={fullRow}>
    {children}
  </StyledDiv>
);

Element.propTypes = {
  fullRow: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,
};

export default Element;
