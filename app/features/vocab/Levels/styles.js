import styled, { css } from 'styled-components';
import { rgba } from 'polished';

import A from 'common/components/A';
import H2 from 'common/components/H2';
import LockButton from 'common/components/LockButton';
import { gutter } from 'common/styles/layout';
import { white, greyLight, blueLight, purpleLight } from 'common/styles/colors';
import { fastEaseQuad, wobble, spin } from 'common/styles/animation';
import { resetList } from 'common/styles/utils';

export const List = styled.ul`
  ${resetList}
  ${gutter({ prop: 'margin', position: 'vertical', type: 'outer' })}
  ${gutter({ prop: 'margin', position: 'horizontal', mod: 3 })}
  display: flex;
  flex-flow: row wrap;
  border: 1px solid ${rgba(greyLight, 0.5)};
  & > li {
    ${gutter({ type: 'inner', position: 'horizontal' })}
    flex: 1 1 400px;
    border: 1px solid ${rgba(greyLight, 0.5)};
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

export const Title = H2.extend`
  color: inherit;
  margin-right: 0.6em;
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
    & ${Link} {
      pointer-events: none;
    }
  `}

  ${({ isActionable, isLocked }) => isActionable && !isLocked ? css`
    &:hover {
      color: ${white};
      background-color: ${rgba(purpleLight, 0.7)};
    }` : css`
    color: ${greyLight};
  `}

  ${({ isActionable, isLocked }) => isActionable && css`
    &:hover {
      & ${Button} {
        color: ${isLocked ? rgba(purpleLight, 0.7) : 'currentColor'};
        animation: ${wobble} 1s linear infinite;
        &:hover {
          animation: none;
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
      color: ${blueLight} !important;
      animation: ${spin} 1.5s linear infinite !important;
    }
  `}
`;
