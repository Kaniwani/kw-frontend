import styled, { css } from 'styled-components';

import { white, purpleDark, SRS_COLORS } from 'shared/styles/colors';
import { gutter, centerByMargin } from 'shared/styles/layout';
import { giga, gamma } from 'shared/styles/typography';
import { borderRadius } from 'shared/styles/sizing';
import { slowEaseQuad } from 'shared/styles/animation';

import TagsList from 'components/TagsList';

export const Wrapper = styled.div`
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
  letter-spacing: -0.03em;
  text-shadow: .1em .2em .4em ${purpleDark};
  padding: 2em .5em;
`;

export const Primary = styled.span`
  ${giga}
  display: block;
`;

export const Secondary = styled.span`
  ${gamma}
  ${gutter({ position: 'top' })}
  font-weight: 400;
`;

export const Tags = styled(TagsList)`
  ${({ isInvisible }) => isInvisible && 'opacity: 0;'}
`;

export const StreakContent = styled.div`
  ${gutter()}
  position: absolute;
  top: 0;
  opacity: 0;
  background-color: crimson;
  border-radius: ${borderRadius};
`;

export const StreakAnimation = styled.div`
  position: relative;
  overflow: visible;
  bottom: 0;
  height: 0;
  display: flex;
  justify-content: center;
  text-align: center;
  color: ${white};
  z-index: 4;
  ${({ changed, streakName, rankUp }) => changed && css`
    & ${StreakContent} {
      background-color: ${SRS_COLORS[streakName]};
      opacity: 1;
      transition: all ${slowEaseQuad} 0s normal both running;
      ${rankUp && css`
        top: 2.5rem;
      `}
      ${!rankUp && css`
        top: -2.3rem;
      `}
    }
  `}


`;
