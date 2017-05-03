import styled from 'styled-components';
import { resetList, fluidType } from 'shared/styles/utils';
import { halfElementGutterMobile, halfElementGutterDesktop, borderRadius } from 'shared/styles/sizing';
import { media } from 'shared/styles/media';
import * as COLORS from 'shared/styles/colors';

export const Ul = styled.ul`
  ${resetList}
  padding: ${halfElementGutterMobile};
  ${media('min').sm`
    padding: ${halfElementGutterDesktop};
  `}
`;

export const Li = styled.li`
  ${fluidType(10, 16, 300, 1800)}
  display: inline-flex;
  max-width: 100%;
  padding: .25rem .5rem .2rem;
  line-height: 1.2;
  text-decoration: none;
  vertical-align: middle;
  align-items: center;
  color: ${({ color }) => COLORS[color]};
  background-color: ${({ bgColor }) => COLORS[bgColor]};
  border-radius: ${borderRadius};
  margin: ${halfElementGutterMobile};
  ${media('min').sm`
    margin: ${halfElementGutterDesktop};
  `}
`;

export const Span = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: .2em;
  margin-right: .2em;
`;
