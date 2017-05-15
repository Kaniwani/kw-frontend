import styled from 'styled-components';
import { transparentize, darken } from 'polished';

import A from 'base/A';
import H2 from 'base/H2';
import LockButton from 'components/LockButton';
import { containerGutter } from 'shared/styles/layout';
import { white, greyLight, grey, greyDark } from 'shared/styles/colors';
import { ffBody } from 'shared/styles/typography';
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
${containerGutter}
  flex: 999 1 auto;
`;

export const Title = styled(H2)`
  color: inherit;
  @supports(display: grid) {
    display: grid;
    grid-template-columns: 5.5em auto;
  }
`;

export const Text = styled.span`
  margin-right: .75em;
`;

export const ItemCount = styled.span`
  padding-top: .25em;
  font-size: .7em;
  font-family: ${ffBody};
  color: ${grey};
  align-self: end;
`;

export const Button = styled(LockButton)`
  ${containerGutter}
  flex: 0 0 auto;
`;
