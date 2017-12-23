import styled, { css } from 'styled-components';
import { mix, lighten } from 'polished';

import { greyDark } from 'shared/styles/colors';
import { epsilon } from 'shared/styles/typography';
import { fastEaseQuad } from 'shared/styles/animation';
import { resetButton } from 'shared/styles/utils';
import { gutter } from 'shared/styles/layout';

import A from 'base/A';

const buttonStyle = css`
  ${epsilon}
  display: inline-flex;
  text-align: center;
  justify-content: center;
  align-content: center;
  align-items: center;
  color: ${({ color }) => color};
  background-color: ${({ bgColor }) => bgColor};
  transition: all ${fastEaseQuad};
  text-decoration: none;
  appearance: none;
  user-select: none;
  cursor: pointer;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
  }

  ${({ plainButton }) => plainButton ? css`
    ${resetButton}
  ` : css`
    ${gutter({ prop: 'margin' })}
    ${gutter({ prop: 'padding', position: 'vertical' })}
    ${gutter({ prop: 'padding', position: 'horizontal', mod: 3 })}
    border: 2px solid ${({ bgColor }) => bgColor};
    border-radius: 4px;
    min-width: 8em;

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
  `}
`;

export const Anchor = styled(A)`
  ${buttonStyle}
`;

export const StyledButton = styled.button`
  ${buttonStyle}
`;
