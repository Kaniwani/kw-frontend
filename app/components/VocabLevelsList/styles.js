import styled from 'styled-components';
import { rgba } from 'polished';

import { resetList } from 'shared/styles/utils';
import { gutter } from 'shared/styles/layout';
import { greyLight } from 'shared/styles/colors';

export const Ul = styled.ul`
  ${resetList}
  ${gutter({ prop: 'margin', position: 'vertical', type: 'outer' })}
  ${gutter({ prop: 'margin', position: 'horizontal', mod: 3 })}
  display: flex;
  flex-flow: row wrap;
  border: 1px solid ${rgba(greyLight, 0.5)};
  > li {
    ${gutter({ type: 'inner', position: 'horizontal' })}
    flex: 1 1 400px;
    border: 1px solid ${rgba(greyLight, 0.5)};
  }
`;
