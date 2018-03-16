import styled from 'styled-components';

import { gutter } from 'common/styles/layout';
import { white, grey } from 'common/styles/colors';
import { ffBody } from 'common/styles/typography';

import H4 from 'common/components/H4';

export const Article = styled.article`
  ${gutter({ position: 'vertical', type: 'margin' })}
  & .ReactCollapse--content {
    ${gutter({ position: 'vertical' })}
    display: flex;
    justify-content: center;
    line-height: 1.3;
    & > div {
      padding: 4px 0 8px;
      max-width: 30em;
      ul {
        padding-left: 12px;
        text-align: left;
        max-width: 26em;
        li {
          padding: 5px 0;
        }
      }
    }
  }
`;

export const Header = styled.header`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  ${({ borderActive }) => borderActive && `border-bottom: 2px solid ${white[7]};`}
`;

export const Title = H4.extend`
  font-weight: 500;
`;

export const Time = styled.time`
  padding: 0 .6rem;
  color: ${grey[8]};
  font-family: ${ffBody};
  font-weight: 400;
  font-size: 0.9em;
`;
