import styled from 'styled-components';
import { transparentize, darken } from 'polished';

import A from 'base/A';
import H2 from 'base/H2';
import LockButton from 'components/LockButton';
import { gutter } from 'shared/styles/layout';
import { white, greyLight, grey, greyDark } from 'shared/styles/colors';
import { fastEaseQuad } from 'shared/styles/animation';

export const Wrapper = styled.li`
  display: flex;
  color: ${greyDark};
  background-color: ${white};
  border-bottom: 2px solid ${transparentize(0.5, greyLight)};
  transition: background-color ${fastEaseQuad};
  cursor: pointer;

  &:last-of-type {
    border-bottom: none;
  }

  ${({ isActionable }) => isActionable ? `
    &:hover {
      background-color: ${darken(0.03, white)};
    }
  ` : `
    pointer-events: none;
    color: ${greyLight};
  `}
`;

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
`;

export const ItemCount = styled.span`
  color: ${grey};
`;

export const LockedLabel = ItemCount.extend`
  margin-left: auto;
`;

export const Button = styled(LockButton)`
  ${gutter({ type: 'outer' })}
  flex: 0 0 auto;
`;
