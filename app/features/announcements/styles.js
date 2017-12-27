import styled from 'styled-components';

import { gutter } from 'common/styles/layout';
import { whiteDark } from 'common/styles/colors';

import H4 from 'common/components/H4';

export const Article = styled.article`
  & .ReactCollapse--content {
    ${gutter()}
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
  ${({ borderActive }) => borderActive && `border-bottom: 2px solid ${whiteDark};`}
`;

export const Title = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-end;
`;

export const TitleText = H4.extend`
  ${''/* already has a gutter */}
  font-weight: 400;
  color: inherit;
`;

export const Time = styled.time`
  ${gutter()}
  font-size: 0.9em;
`;
