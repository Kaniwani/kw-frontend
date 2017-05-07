import styled from 'styled-components';
import { darken } from 'polished';

import A from 'base/A';

import * as COLORS from 'shared/styles/colors';
import { beta } from 'shared/styles/typography';
import { borderRadius } from 'shared/styles/sizing';

export const ListItem = styled.li`
  display: inline-flex;
  align-items: center;
  margin-right: .2em;
  margin-bottom: .2em;
  background-color: ${({ bgColor }) => COLORS[bgColor]};
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  border-radius: ${borderRadius};
  color: ${COLORS.whiteLight};
  max-width: 100%;
  text-decoration: none;
  vertical-align: middle;
`;

export const Link = styled(A)`
  display: block;
  color: currentColor;
  padding: .4rem .6rem;
`;

export const Text = styled.span`
  ${beta}
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-shadow: 1px 1px 0 ${({ shadowColor }) => darken(0.2, COLORS[shadowColor])};
`;
