import styled from 'styled-components';

import { resetList } from 'shared/styles/utils';
import { gutter } from 'shared/styles/layout';

export const Ul = styled.ul`
  ${resetList}
  width: 100%;
  align-items: inherit;
  justify-content: inherit;
`;

export const Li = styled.li`
  ${gutter({ prop: 'margin', position: 'bottom', mod: 4 })}
  display: flex;
  flex-flow: column nowrap;
  align-items: inherit;
  justify-content: inherit;
`;
