import styled from 'styled-components';

import { gutter } from 'shared/styles/layout';
import { resetList } from 'shared/styles/utils';

export const Ul = styled.ul`
  ${gutter()}
  ${gutter({ position: 'vertical', mod: 2 })}
  ${resetList}
  display: flex;
  flex-flow: row wrap;
  justify-content: inherit;
  align-items: inherit;
  align-content: inherit;
`;

export const Li = styled.li`
  ${gutter()}
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;
