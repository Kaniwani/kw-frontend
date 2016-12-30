import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { elementGutter, bannerElement } from 'shared/styles/layout';

const StyledDiv = styled.div`
  ${({ fullRow }) => fullRow ? bannerElement : elementGutter}
  ${({ flexRow, flexCol, flexWrap, flexCenter }) => {
    if (flexRow || flexCol) {
      return `
        display: flex;
        flex-flow: ${(flexRow && 'row') || 'column'} ${(flexWrap && 'wrap') || ''};
        ${flexCenter ? `
            justify-content: center;
            align-content: center;
            align-items: center;
        ` : ''}
      `;
    }
    return '';
  }}
  ${({ justifyContent }) => justifyContent ? `justify-content: ${justifyContent};` : ''}
  ${({ alignContent }) => alignContent ? `align-content: ${alignContent};` : ''}
  ${({ alignItems }) => alignItems ? `align-items: ${alignItems};` : ''}
  ${({ textAlign }) => textAlign ? `text-align: ${textAlign};` : ''};
  ${({ flex }) => flex ? `flex:${flex};` : ''}
  ${({ alignSelf }) => alignSelf ? `align-self:${alignSelf};` : ''}
`;

const Element = ({ children, ...props }) => (
  <StyledDiv {...props} >
    {children}
  </StyledDiv>
);

Element.propTypes = {
  fullRow: PropTypes.bool,
  flexRow: PropTypes.bool,
  flexCol: PropTypes.bool,
  flexWrap: PropTypes.bool,
  flexCenter: PropTypes.bool,
  textAlign: PropTypes.string,
  justifyContent: PropTypes.string,
  alignContent: PropTypes.string,
  alignItems: PropTypes.string,
  flex: PropTypes.string,
  alignSelf: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,
};

export default Element;
