import styled, { css } from 'styled-components';
import { mix, lighten } from 'polished';

import { greyDark } from 'shared/styles/colors';
import { epsilon } from 'shared/styles/typography';
import { fastEaseQuad } from 'shared/styles/animation';
import { resetButton } from 'shared/styles/utils';
import { gutter } from 'shared/styles/layout';

import A from 'base/A';

const buttonStyle = css`
  ${gutter()}
  ${epsilon}
  display: inline-flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  box-sizing: border-box;
  min-width: 8em;
  text-decoration: none;
  appearance: none;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  color: ${({ color }) => color};
  border: 2px solid ${({ bgColor }) => bgColor};
  background-color: ${({ bgColor }) => bgColor};
  transition: all ${fastEaseQuad};

  &:focus {
    outline: none;
  }

  & {
    ${({ plainButton }) => plainButton ? css`
        ${resetButton}
        min-width: auto;
      ` : css`
        &:disabled {
          cursor: not-allowed;
          background-color: ${({ bgColor }) => mix(0.5, bgColor, greyDark)};
          border-color: ${({ bgColor }) => mix(0.5, bgColor, greyDark)};
        }
        &:not(:disabled) {
          &:active,
          &:focus,
          &:hover {
            color: ${({ colorHover }) => colorHover};
            background-color: ${({ bgColorHover }) => bgColorHover};
            border-color: ${({ colorHover }) => colorHover};
          }

          &:active {
            color: ${({ color }) => color};
            background-color: ${({ bgColor }) => lighten(0.2, bgColor)};
          }
        }
      `
}
  }
`;

export const Anchor = styled(A)`
  ${buttonStyle}
`;

export const StyledButton = styled.button`
  ${buttonStyle}
`;
