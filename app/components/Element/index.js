import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { elementGutter, bannerElement } from 'shared/styles/layout';

const StyledDiv = styled.div`
  ${(props) => props.fullRow ? bannerElement : elementGutter}
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
