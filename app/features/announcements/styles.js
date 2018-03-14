import styled from 'styled-components';

import { gutter } from 'common/styles/layout';
import { white, grey } from 'common/styles/colors';
import { ffBody } from 'common/styles/typography';

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
  flex-flow: row wrap;
  align-items: flex-end;
  justify-content: center;
  ${({ borderActive }) => borderActive && `border-bottom: 2px solid ${white[7]};`}
`;

export const Title = H4.extend`
  font-weight: 500;
`;

export const Time = styled.time`
  ${gutter({ mod: 1 })}
  display: block;
  color: ${grey[8]};
  font-family: ${ffBody};
  font-weight: 400;
  font-size: 0.9em;
`;
