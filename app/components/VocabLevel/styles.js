import styled, { css } from 'styled-components';
import { rgba } from 'polished';

import A from 'base/A';
import H2 from 'base/H2';
import LockButton from 'components/LockButton';
import { gutter } from 'shared/styles/layout';
import { white, greyLight, grey, blue, purpleLight } from 'shared/styles/colors';
import { fastEaseQuad, wobble, spin } from 'shared/styles/animation';

export const LevelLink = styled(A)`
  ${gutter({ type: 'outer' })}
  display: flex;
  flex-flow: row wrap;
  flex: 999 1 auto;
  align-items: center;
`;

export const Title = H2.extend`
  color: inherit;
  margin-right: .75em;
  transition: color ${fastEaseQuad};
`;

export const ItemCount = styled.span`
  color: ${grey};
  transition: color ${fastEaseQuad};
`;

export const LockedLabel = ItemCount.extend`
  margin-left: auto;
`;

export const Button = styled(LockButton)`
  ${gutter({ type: 'outer' })}
  flex: 0 0 auto;
`;

export const Wrapper = styled.li`
  display: flex;
  background-color: ${white};
  border-bottom: 2px solid ${rgba(greyLight, 0.5)};
  transition: background-color ${fastEaseQuad};

  &:last-of-type {
    border-bottom: none;
  }

  ${({ isLocked }) => isLocked && css`
    & ${LevelLink} {
      pointer-events: none;
    }
  `}

  ${({ isActionable, isLocked }) => isActionable && !isLocked ? css`
    &:hover {
      color: ${white};
      background-color: ${rgba(purpleLight, 0.7)};
      & ${Button},
      & ${ItemCount} {
        color: ${white};
      }
    }
  ` : css`
      color: ${greyLight};
  `}

  ${({ isActionable, isLocked }) => isActionable && css`
    &:hover {
      & ${Button} {
        ${isLocked && `color: ${rgba(purpleLight, 0.7)};`}
        animation: ${wobble} 1s linear infinite;
        &:hover {
          animation: none;
        }
      }
    }
  `}

  ${({ isSubmitting }) => isSubmitting && css`
    cursor: wait;
    & ${Button} {
      cursor: inherit;
      opacity: 1;
      color: ${blue} !important;
      animation: ${spin} 1s linear infinite !important;
    }
  `}
`;
