import styled from 'styled-components';
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
} from 'common/styles/layout';

export const StyledElement = styled.div`
  ${fullRowMixin}
  ${flexMixin}
  ${alignContentMixin}
  ${alignItemsMixin}
  ${alignSelfMixin}
  ${justifyContentMixin}
  ${textAlignMixin}
  ${flexCenterMixin}
  ${flexShorthandMixin}
`;
