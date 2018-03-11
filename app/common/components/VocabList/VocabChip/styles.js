import styled from 'styled-components';
import { mix } from 'polished';

import A from 'common/components/A';

import { fluidType } from 'common/styles/utils';
import { borderRadius } from 'common/styles/sizing';

export const Wrapper = styled.li`
  display: inline-flex;
  background-color: ${({ bgColor }) => mix(0.8, bgColor, '#bbb')};
  color: ${({ textColor }) => textColor};
  border-radius: ${borderRadius};
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  flex-basis: auto !important;
`;

export const Link = styled(A)`
  padding: .3rem .6rem;
  display: block;
`;

export const Text = styled.span`
  ${fluidType(26, 32, 300, 2000)};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-shadow: 1px 1px 0 ${({ shadowColor }) => mix(0.8, shadowColor, '#444')};
`;
