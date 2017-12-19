import styled from 'styled-components';
import { transparentize, darken } from 'polished';
import { gutter } from 'shared/styles/layout';
import { borderRadius } from 'shared/styles/sizing';

import A from 'base/A';

export const Wrapper = styled.div`
  display: inline-flex;
  color: ${({ textColor }) => textColor};
  background-color: ${({ bgColor }) => bgColor};
  text-shadow: 0 2px 2px ${({ bgColor }) => transparentize(0.3, darken(0.2, bgColor))};
  border-radius: ${borderRadius};
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
`;

export const Link = styled(A)`
  ${gutter({ position: 'vertical', mod: 2 })}
  ${gutter({ position: 'horizontal', mod: 4 })}
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-content: center;
  align-items: center;
`;
