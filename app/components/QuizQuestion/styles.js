import styled from 'styled-components';

import { white, purpleDark, SRS_COLORS } from 'shared/styles/colors';
import { gutter, centerByMargin } from 'shared/styles/layout';
import { giga, gamma } from 'shared/styles/typography';
import { borderRadius } from 'shared/styles/sizing';
import { srsRankUp, srsRankDown } from 'shared/styles/animation';

import H6 from 'base/H6';

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

export const StreakAnimationWrapper = styled.div`
  ${gutter()}
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 4;
  display: flex;
  justify-content: center;
`;

export const StreakAnimationContent = H6.extend`
  display: flex;
  ${gutter({ position: 'vertical', mod: 0 })}
  ${gutter({ position: 'horizontal' })}
  align-content: center;
  align-items: center;
  color: ${white};
  border-radius: ${borderRadius};
  opacity: 0;
  text-transform: capitalize;

  ${({ changed, streakName, rankUp }) => changed && `
    background-color: ${SRS_COLORS[streakName]};
    animation: ${rankUp ? srsRankUp : srsRankDown} .75s ease 0s 1 normal both running;
  `}
`;

export const StreakText = styled.div`
  ${gutter({ position: 'right', mod: 2 })}
`;
