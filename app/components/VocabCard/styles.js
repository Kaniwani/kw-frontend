import styled from 'styled-components';
import { transparentize, darken } from 'polished';

import * as COLORS from 'shared/styles/colors';
import { ffHeading, mega, gamma, delta } from 'shared/styles/typography';
import { borderRadius } from 'shared/styles/sizing';
import { gutter } from 'shared/styles/layout';

import A from 'base/A';

export const Li = styled.li`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex: 1 1 auto;
  line-height: 1;
  margin-right: .3em;
  margin-bottom: .3em;
  background-color: ${({ bgColor }) => COLORS[bgColor]};
  box-shadow: 2px 2px 0 rgba(0,0,0, .1);
  border-radius: ${borderRadius};
  color: ${COLORS.whiteLight};
  font-size: 1.2em;
  max-width: 100%;
  text-decoration: none;
`;

export const Link = styled(A)`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  color: currentColor;
  flex: 1 0 auto;
`;

export const Dl = styled.dl`
  display: flex;
  margin: 0;
  padding: 1.25em;
  width: 100%;
  flex-flow: row wrap;
  justify-content: center;
  align-content: center;
  flex: 1 0 auto;

  .reading {
    ${gutter()}
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-flow: column;
    flex: 0 1 auto;

    .kana {
      /* no gutter: reading, character, and separator all surround the kana with padding */
      ${delta}
      word-break: keep-all;
      text-shadow: 0 1px 2px ${({ color }) => transparentize(0.3, darken(0.2, COLORS[color]))};
      line-height: 1.1;
    }

    .character {
      ${gutter()}
      ${mega}
      word-break: keep-all;
      text-shadow: 0 2px 2px ${({ color }) => transparentize(0.3, darken(0.2, COLORS[color]))};
    }
  }

  .meaning {
    ${gutter()}
    ${gamma}
    text-transform: capitalize;
    margin: 0;
    flex: 0 1 55%;
    align-self: center;
    text-align: center;
    font-family: ${ffHeading};
    font-weight: 600;
    line-height: 1.25;
    text-shadow: 0 1px 2px ${({ color }) => transparentize(0.7, darken(0.2, COLORS[color]))};
  }

  .separator {
    height: .1rem;
    margin: .2rem 0 .5rem;
    width: 100%;
    background-color: ${({ color }) => transparentize(0.7, darken(0.2, COLORS[color]))};
    border: .075rem solid ${({ color }) => transparentize(0.9, darken(0.2, COLORS[color]))};
    border-radius: 100%;
    &:last-of-type {
      display: none;
    }
  }
`;
