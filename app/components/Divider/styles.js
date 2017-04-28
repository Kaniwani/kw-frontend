import styled from 'styled-components';
import { transparentize } from 'polished';
import * as COLORS from 'shared/styles/colors';
import { media } from 'shared/styles/media';
import { padding } from 'shared/styles/sizing';

const fullWidthMixin = ({ fullWidth }) => `max-width: ${fullWidth ? '100%' : '70%'};`;

const borderColorMixin = ({ color, fade }) => {
  const dividerColor = COLORS[color];
  return fade ? `
    border-image: linear-gradient(
      90deg,
      ${transparentize(1, dividerColor)},
      ${transparentize(0, dividerColor)} 50%,
      ${transparentize(1, dividerColor)} 100%) 0 0 100%;
  ` : `
    border-color: ${dividerColor};
  `;
};

export const StyledDivider = styled.div`
  ${`margin: ${padding.mobile.inner.y}rem auto;`}
  ${media('min').sm`
    margin: ${padding.desktop.inner.y}rem auto;
  `}
  color: ${({ color }) => COLORS[color]};
  background-color: ${COLORS.transparent};
  background-position: 50%;
  border: 0;
  border-width: 0 0 1px;
  border-style: solid;
  ${fullWidthMixin}
  ${borderColorMixin}
`;
