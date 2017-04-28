import React from 'react';
import styled, { css } from 'styled-components';
import {
  alignContentMixin,
  alignItemsMixin,
  alignSelfMixin,
  flexCenterMixin,
  flexMixin,
  flexShorthandMixin,
  fullRowMixin,
  justifyContentMixin,
  textAlignMixin,
} from 'shared/styles/layout';


const style = css`
  ${fullRowMixin}
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
export const StyledElement = styled(({
  tag,
  children,
  fullRow,
  flexDisplay,
  flexRow,
  flexCol,
  flexWrap,
  flexCenter,
  flex,
  textAlign,
  justifyContent,
  alignContent,
  alignItems,
  alignSelf,
 ...props }) => React.createElement(tag, props, children))`${style}`;
/* eslint-enable */
