import styled from 'styled-components';

import { white, purpleDark } from 'shared/styles/colors';
import { gutter, centerByMargin } from 'shared/styles/layout';
import { giga, gamma } from 'shared/styles/typography';

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
  ${gutter({ position: 'top', type: 'inner' })}
  font-weight: 400;
`;

export const Tags = styled(TagsList)`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-self: center;
  z-index: 2;
`;
