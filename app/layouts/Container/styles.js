import React from 'react';
import styled, { css } from 'styled-components';
import {
  alignContentMixin,
  alignItemsMixin,
  alignSelfMixin,
  containerGutter,
  flexCenterMixin,
  flexMixin,
  flexShorthandMixin,
  justifyContentMixin,
  textAlignMixin,
} from 'shared/styles/layout';


const style = css`
  position: relative; /* catch any absolute children */
  ${({ withPadding }) => withPadding && containerGutter}
  ${({ marginTop }) => marginTop && `margin-top: ${marginTop};`}
  ${flexMixin}
  ${flexCenterMixin}
  ${flexShorthandMixin}
  ${alignContentMixin}
  ${alignItemsMixin}
  ${alignSelfMixin}
  ${justifyContentMixin}
  ${textAlignMixin}
`;

/* eslint-disable no-unused-vars */
// A bit crazytown, but this way we can pass the tag as a prop to dynamically choose 'div', 'section', 'header' etc
export const StyledContainer = styled(({
  tag,
  children,
  withPadding,
  marginTop,
  fullRow,
  flexRow,
  flexDisplay,
  flexColumn,
  flexWrap,
  flexCenter,
  textAlign,
  justifyContent,
  alignContent,
  alignItems,
  flex,
  alignSelf,
 ...props
}) => React.createElement(tag, props, children))`${style}`;
/* eslint-enable */
