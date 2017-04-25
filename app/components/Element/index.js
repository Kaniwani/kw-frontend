import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { elementGutter, bannerElement } from 'shared/styles/layout';

Element.defaultProps = {
  tag: 'div',
  fullRow: false,
  flexRow: false,
  flexCol: false,
  flexWrap: false,
  flexCenter: false,
  textAlign: '',
  justifyContent: '',
  alignContent: '',
  alignItems: '',
  flex: '',
  alignSelf: '',
};

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
  tag: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,
};

const elementStyle = css`
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

/* eslint-disable no-unused-vars */
const StyledElement = styled(({
  tag,
  children,
  fullRow,
  flexRow,
  flexCol,
  flexWrap,
  flexCenter,
  textAlign,
  justifyContent,
  alignContent,
  alignItems,
  flex,
  alignSelf,
 ...props }) => React.createElement(tag, props, children))`${elementStyle}`;
/* eslint-enble */

function Element({ tag, children, ...props }) {
  return (
    <StyledElement tag={tag} {...props}>
      {children}
    </StyledElement>
  );
}

export default Element;
