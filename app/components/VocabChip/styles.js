import styled from 'styled-components';
import { darken } from 'polished';

import A from 'base/A';

import { gutter } from 'shared/styles/layout';
import { fluidType } from 'shared/styles/utils';
import { borderRadius } from 'shared/styles/sizing';

export const Wrapper = styled.div`
  display: inline-flex;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ textColor }) => textColor};
  border-radius: ${borderRadius};
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
`;

export const Link = styled(A)`
  ${gutter({ position: 'vertical' })}
  ${gutter({ position: 'horizontal', mod: 1.5 })}
  display: block;
`;

export const Text = styled.span`
  ${fluidType(26, 32, 300, 2000)};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-shadow: 1px 1px 0
  ${({ shadowColor }) => darken(0.2, shadowColor)};
`;
