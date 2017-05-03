import React from 'react';
import styled, { css } from 'styled-components';
import { lighten } from 'polished';
import { epsilon } from 'shared/styles/typography';
import { transitionAllEase } from 'shared/styles/animation';

import A from 'base/A';

const style = css`
  ${epsilon}
  ${transitionAllEase}
  display: inline-block;
  box-sizing: border-box;
  padding: .25em .4em;
  min-width: 6em;
  text-align: center;
  text-decoration: none;
  appearance: none;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  border: 2px solid ${({ color }) => color};
  color: ${({ color }) => color};
  background-color: ${({ bgColor }) => bgColor};

  &:active,
  &:focus,
  &:hover {
    color: ${({ colorHover }) => colorHover};
    background-color: ${({ bgColorHover }) => bgColorHover};
  }

  &:active {
    color: ${({ color }) => color};
    background-color: ${({ bgColor }) => lighten(0.2, bgColor)};
  }
`;

export const StyledA = styled(({ color, colorHover, bgColor, bgColorHover, ...props }) =>
  <A {...props} />)`${style}`;

export const StyledButton = styled(({ color, colorHover, bgColor, bgColorHover, ...props }) =>
  <button {...props} />)`${style}`;
