import styled from 'styled-components';
import {
  gutter,
  alignContentMixin,
  alignItemsMixin,
  alignSelfMixin,
  flexCenterMixin,
  flexMixin,
  flexShorthandMixin,
  justifyContentMixin,
  textAlignMixin,
} from 'common/styles/layout';

export const StyledContainer = styled.div`
  position: relative; /* catch any absolute children */
  ${({ withPadding }) => withPadding && gutter({ type: 'outer' })}
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
