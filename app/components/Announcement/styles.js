import styled from 'styled-components';

import { gutter } from 'shared/styles/layout';
import { epsilon } from 'shared/styles/typography';
import { whiteDark } from 'shared/styles/colors';

import H3 from 'base/H3';

export const Article = styled.article`
  & .ReactCollapse--content {
    ${gutter()}
    max-width: 45em;
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

export const TitleText = H3.extend`
  ${''/* already has a gutter */}
  color: inherit;
  line-height: 1;
`;

export const Time = styled.time`
  ${gutter()}
  ${epsilon}
`;
