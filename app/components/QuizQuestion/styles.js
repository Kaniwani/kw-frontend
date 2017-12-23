import styled, { css } from 'styled-components';
import { darken } from 'polished';

import { white } from 'shared/styles/colors';
import { gutter, centerByMargin } from 'shared/styles/layout';
import { giga, gamma } from 'shared/styles/typography';
import { borderRadius } from 'shared/styles/sizing';
import { srsRankUp, srsRankDown } from 'shared/styles/animation';
import { outerLight } from 'shared/styles/shadows';

import H4 from 'base/H4';

export const MeaningsWrapper = styled.div`
  flex: 999 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Meanings = styled.h1`
  ${centerByMargin};
  color: ${white};
  text-transform: capitalize;
  letter-spacing: -0.03em;
  padding: 5vw .5rem;
`;

export const Primary = styled.div`
  ${giga}
`;

export const Secondary = styled.div`
  ${gutter({ position: 'top' })}
  ${gamma}
  line-height: 1.3;
  font-weight: 300;
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  text-align: center;
  flex: 1 1 100%;
  background-color: ${({ bgColor }) => bgColor};

  & ${Meanings} {
    text-shadow: .1em .2em .4em ${({ bgColor }) => darken(0.1, bgColor)};
  }
`;

export const FlyoverWrapper = styled.div`
  ${gutter({ position: 'vertical', prop: 'margin' })}
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 4;
  display: flex;
  justify-content: center;
`;

export const FlyoverContent = H4.extend`
  ${gutter({ position: 'horizontal', mod: 3 })}
  box-shadow: ${outerLight};
  display: flex;
  min-width: 6em;
  text-align: center;
  justify-content: flex-start;
  align-content: center;
  align-items: flex-end;
  color: ${white};
  border-radius: ${borderRadius};
  opacity: 0;
  text-transform: capitalize;

  ${({ hasChanged, animateUp, color }) => hasChanged && css`
      border: 1px solid ${darken(0.1, color)};
      background-color: ${color};
      animation: ${animateUp ? srsRankUp : srsRankDown} 0.7s ease 0s 1 normal both running;
    `}

  & > span {
    ${gutter({ prop: 'margin', position: 'horizontal', mod: 0.5 })}
  }
`;
