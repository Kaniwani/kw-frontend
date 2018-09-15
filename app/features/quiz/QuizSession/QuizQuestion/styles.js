import styled, { css } from 'styled-components';

import { white } from 'common/styles/colors';
import { gutter, centerByMargin } from 'common/styles/layout';
import { giga, gamma } from 'common/styles/typography';
import { borderRadius } from 'common/styles/sizing';
import { srsRankUp, srsRankDown } from 'common/styles/animation';
import { outerLight } from 'common/styles/shadows';

import H4 from 'common/components/H4';

export const MeaningsWrapper = styled.div`
  flex: 999 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Meanings = styled.h1`
  ${centerByMargin};
  color: ${white[3]};
  text-transform: capitalize;
  letter-spacing: -0.03em;
  padding: 4vmax .5rem;
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
  text-align: center;
  flex: 1 1 100%;
`;

export const FlyoverWrapper = styled.div`
  ${gutter({ position: 'vertical', prop: 'margin' })}
  position: absolute;
  bottom: 0;
  z-index: 4;
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const FlyoverContent = styled(H4)`
  ${gutter({ position: 'left', mod: 2 })}
  ${gutter({ position: 'right', mod: 3 })}
  box-shadow: ${outerLight};
  display: flex;
  text-align: center;
  justify-content: flex-start;
  align-content: center;
  align-items: flex-end;
  border-radius: ${borderRadius};
  opacity: 0;
  text-transform: capitalize;

  ${({ hasChanged, animateUp, bgColor, color }) => hasChanged && css`
      color: ${color};
      background-color: ${bgColor};
      animation: ${animateUp ? srsRankUp : srsRankDown} 0.7s ease 0s 1 normal both running;
    `}

  & > span {
    ${gutter({ prop: 'margin', position: 'horizontal', mod: 0.5 })}
  }
`;
