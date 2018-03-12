import styled from 'styled-components';

import { gutter } from 'common/styles/layout';
import { white } from 'common/styles/colors';

import H4 from 'common/components/H4';

export const Article = styled.article`
  & .ReactCollapse--content {
    ${gutter({ position: 'vertical', mod: 3 })}
    max-width: 30em;
    line-height: 1.3;
    text-align: left;
    & > div {
      ${gutter()}
    }
  }
`;

export const Header = styled.header`
  display: flex;
  ${({ borderActive }) => borderActive && `border-bottom: 2px solid ${white[7]};`}
`;

export const Title = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  text-align: left;
`;

export const TitleText = H4.extend`
  font-weight: 500;
  color: inherit;
`;

export const Time = styled.time`
  ${gutter()}
  font-size: 0.9em;
`;
