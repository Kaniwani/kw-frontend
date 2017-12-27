import styled from 'styled-components';
import { mix } from 'polished';
import { gutter } from 'common/styles/layout';
import { borderRadius } from 'common/styles/sizing';

import A from 'common/components/A';

export const Wrapper = styled.li`
  display: inline-flex;
  flex: 1 0 auto;
  justify-content: center;
  color: ${({ textColor }) => textColor};
  background-color: ${({ bgColor }) => mix(0.8, bgColor, '#bbb')};
  text-shadow: 0 2px 2px ${({ bgColor }) => mix(0.8, bgColor, '#444')};
  border-radius: ${borderRadius};
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
`;

export const Link = styled(A)`
  ${gutter({ position: 'vertical', mod: 2 })}
  ${gutter({ position: 'horizontal', mod: 4 })}
  display: flex;
  width: 100%;
  flex-flow: column nowrap;
  text-align: center;
  justify-content: center;
  align-content: center;
  align-items: center;
`;
