import styled from 'styled-components';
import { darken } from 'polished';

import { white, purpleDark, SRS_COLORS } from 'common/styles/colors';
import { gutter, centerByMargin } from 'common/styles/layout';
import { giga, gamma } from 'common/styles/typography';
import { borderRadius } from 'common/styles/sizing';
import { srsRankUp, srsRankDown } from 'common/styles/animation';
import { outerLight } from 'common/styles/shadows';

import H4 from 'common/components/H4';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  text-align: center;
  flex: 1 1 100%;
`;

export const QuestionWrapper = styled.div`
  flex: 999 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Question = styled.h1`
  ${centerByMargin};
  color: ${white};
  font-weight: 700;
  text-transform: capitalize;
  letter-spacing: -0.03em;
  text-shadow: .1em .2em .4em ${purpleDark};
  padding: 5vw .5rem;
`;

export const Primary = styled.div`
  ${giga}
`;

export const Secondary = styled.div`
  ${gamma}
  line-height: 1.3;
  ${gutter({ position: 'top' })}
  font-weight: 400;
`;

export const FlyoverWrapper = styled.div`
  position: absolute;
  ${gutter({ position: 'vertical', prop: 'margin' })}
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
  align-items: center;
  color: ${white};
  border-radius: ${borderRadius};
  opacity: 0;
  text-transform: capitalize;

  ${({ ignored, changed, streakName, rankUp }) => {
    const color = ignored ? 'orange' : SRS_COLORS[streakName];
    return changed && `
      border: 1px solid ${darken(0.1, color)};
      background-color: ${color};
      animation: ${rankUp ? srsRankUp : srsRankDown} .75s ease 0s 1 normal both running;
    `;
  }}

  & > * {
    ${gutter({ prop: 'margin', position: 'horizontal', mod: 0.5 })}
  }
  `;
