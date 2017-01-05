import React, { PropTypes } from 'react';
import styled, { css } from 'styled-components';
import { containerGutter } from 'shared/styles/layout';

const containerStyle = css`
  position: relative; /* catch any absolute children */
  ${({ withPadding }) => withPadding ? containerGutter : ''}
  ${({ marginTop }) => marginTop ? `margin-top: ${marginTop};` : ''}
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
// A bit crazytown, but this way we can pass the tag as a prop to dynamically choose 'div', 'section', 'header' etc
const StyledContainer = styled(({
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
  withPadding,
 ...props }) => React.createElement(
  tag,
  props,
  children,
))`${containerStyle}`;
/* eslint-enable */

const Container = ({ tag, children, ...props }) =>
  <StyledContainer tag={tag} {...props}>{children}</StyledContainer>;

Container.propTypes = {
  withPadding: PropTypes.bool,
  marginTop: PropTypes.string,
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

Container.defaultProps = {
  tag: 'div',
  withPadding: true,
};

export default Container;
