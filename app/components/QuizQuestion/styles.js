import styled from 'styled-components';

import { white, purpleDark, SRS_COLORS } from 'shared/styles/colors';
import { gutter, centerByMargin } from 'shared/styles/layout';
import { giga, gamma } from 'shared/styles/typography';
import { borderRadius } from 'shared/styles/sizing';
import { slowEaseQuad } from 'shared/styles/animation';

import H4 from 'base/H4';

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
  text-transform: capitalize;
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

export const StreakAnimation = H4.extend`
  ${gutter({ prop: 'margin' })} /* match TagList height */
  line-height: 1;
  text-align: center;
  align-self: center;
  color: ${white};
  z-index: 4;
  border-radius: ${borderRadius};
`;
