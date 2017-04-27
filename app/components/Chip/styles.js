import styled from 'styled-components';
import { fluidType } from 'shared/styles/utils';
import { borderRadius } from 'shared/styles/sizing';
import * as COLORS from 'shared/styles/colors';

export const Li = styled.li`
  ${fluidType(10, 16, 300, 1800)}
  display: inline-flex;
  max-width: 100%;
  padding: .2em .5em;
  margin: .15em;
  line-height: 1.4;
  text-decoration: none;
  vertical-align: middle;
  align-items: center;
  background-color: ${(props) => COLORS[props.bgColor]};
  color: ${(props) => COLORS[props.textColor]};
  border-radius: ${borderRadius};
`;

export const Span = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: .2em;
  margin-right: .2em;
`;
