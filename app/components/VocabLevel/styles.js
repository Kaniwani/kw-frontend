import styled, { css } from 'styled-components';
import { rgba } from 'polished';

import A from 'base/A';
import H2 from 'base/H2';
import LockButton from 'components/LockButton';
import { gutter } from 'shared/styles/layout';
import { white, greyLight, blueLight, purpleLight } from 'shared/styles/colors';
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
  margin-right: .6em;
  transition: color ${fastEaseQuad};
`;

export const ItemCount = styled.span`
  color: inherit;
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
  transition: background-color ${fastEaseQuad};
  ${({ isActionable, isLocked }) => (isLocked || !isActionable) && css`
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

    & ${LevelLink},
    & ${Button} {
      cursor: inherit;
    }

    & ${Button} {
      opacity: 1;
      color: ${blueLight} !important;
      animation: ${spin} 1.5s linear infinite !important;
    }
  `}
`;
