import styled from 'styled-components';
import { darken } from 'polished';

import A from 'base/A';

import * as COLORS from 'shared/styles/colors';
import { fluidType } from 'shared/styles/utils';
import { borderRadius } from 'shared/styles/sizing';

export const ListItem = styled.li`
  display: inline-flex;
  align-items: center;
  margin-right: 0.2em;
  margin-bottom: 0.2em;
  background-color: ${({ bgColor }) => COLORS[bgColor]};
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  border-radius: ${borderRadius};
  color: ${COLORS.whiteLight};
  max-width: 100%;
  vertical-align: middle;
  cursor: pointer;
  text-decoration: none;
`;

export const Link = styled(A)`
  display: block;
  color: currentColor;
  padding: 0.4rem 0.6rem;
`;

export const Text = styled.span`
  ${fluidType(26, 32, 300, 2000)};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-shadow: 1px 1px 0
    ${({ shadowColor }) => darken(0.2, COLORS[shadowColor])};
`;
