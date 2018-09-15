import styled, { css } from 'styled-components';
import { rgba } from 'polished';

import A from 'common/components/A';
import H2 from 'common/components/H2';
import LockButton from 'common/components/LockButton';
import { gutter } from 'common/styles/layout';
import { white, grey, blue, purple } from 'common/styles/colors';
import { fastEaseQuad, wobble, spin } from 'common/styles/animation';
import { resetList } from 'common/styles/utils';

export const List = styled.ul`
  ${resetList}
  ${gutter({ prop: 'margin', position: 'vertical', type: 'outer' })}
  ${gutter({ prop: 'margin', position: 'horizontal', mod: 3 })}
  display: flex;
  flex-flow: row wrap;
  border: 1px solid ${rgba(grey[2], 0.5)};
  & > li {
    ${gutter({ type: 'inner', position: 'horizontal' })}
    flex: 1 1 400px;
    border: 1px solid ${rgba(grey[2], 0.5)};
  }
`;

export const Link = styled(A).attrs({
  plainLink: true,
})`
  ${gutter({ type: 'outer' })}
  display: flex;
  flex-flow: row wrap;
  flex: 999 1 auto;
  align-items: center;
`;

export const Title = styled(H2)`
  color: inherit;
  margin-right: 0.6em;
  transition: color ${fastEaseQuad};
`;

export const ItemCount = styled.span`
  color: inherit;
  transition: color ${fastEaseQuad};
`;

export const LockedLabel = styled(ItemCount)`
  margin-left: auto;
`;

export const Button = styled(LockButton)`
  ${gutter({ type: 'outer' })}
  flex: 0 0 auto;
`;

export const Wrapper = styled.li`
  display: flex;
  background-color: ${white[5]};
  transition: background-color ${fastEaseQuad};
  ${({ isActionable, isLocked }) => (isLocked || !isActionable) && css`
    & ${Link} {
      pointer-events: none;
    }
  `}

  ${({ isActionable, isLocked }) => isActionable && !isLocked ? css`
    &:hover {
      color: ${white[5]};
      background-color: ${rgba(purple[4], 0.7)};
    }` : css`
    color: ${grey[2]};
  `}

  ${({ isActionable, isLocked }) => isActionable && css`
    & ${Button} {
      color: ${isLocked && isActionable && rgba(purple[4], 0.7)};
    }
    &:hover {
      & ${Button} {
        color: ${isLocked ? rgba(purple[4], 0.7) : 'currentColor'};
        ${isLocked && `animation: ${wobble} 1s linear infinite;`}
        &:hover {
          animation: ${wobble} 1s linear infinite;
        }
      }
    }
  `}

  ${({ isActionable, isLocked }) => isLocked && !isActionable && css`
    & ${Button} {
      cursor: not-allowed;
    }
  `}

  ${({ isSubmitting }) => isSubmitting && css`
    cursor: wait;

    & ${Link},
    & ${Button} {
      cursor: inherit;
    }

    & ${Button} {
      opacity: 1;
      color: ${blue[3]} !important;
      animation: ${spin} 1.5s linear infinite !important;
    }
  `}
`;
