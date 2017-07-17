import styled from 'styled-components';

import { resetList, fluidType } from 'shared/styles/utils';
import { gutter } from 'shared/styles/layout';
import { borderRadius } from 'shared/styles/sizing';
import * as COLORS from 'shared/styles/colors';

export const Ul = styled.ul`
  ${resetList}
  ${gutter({ position: 'horizontal', mod: 1 })}
  ${gutter({ position: 'vertical', mod: 0.75 })}
`;

export const Li = styled.li`
  ${fluidType(10, 16, 300, 1800)}
  display: inline-flex;
  max-width: 100%;
  padding: .25rem .5rem .2rem;
  ${gutter({ prop: 'margin', position: 'horizontal', mod: 0.5 })}
  ${gutter({ prop: 'margin', position: 'vertical', mod: 0.5 })}
  line-height: 1.2;
  text-decoration: none;
  vertical-align: middle;
  align-items: center;
  color: ${({ color }) => COLORS[color]};
  background-color: ${({ bgColor }) => COLORS[bgColor]};
  border-radius: ${borderRadius};
`;

export const Span = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: .2em;
  margin-right: .2em;
`;
