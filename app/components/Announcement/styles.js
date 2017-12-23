import styled from 'styled-components';

import { gutter } from 'shared/styles/layout';
import { whiteDark } from 'shared/styles/colors';

import H4 from 'base/H4';

export const Article = styled.article`
  & .ReactCollapse--content {
    ${gutter()}
    max-width: 45em;
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
