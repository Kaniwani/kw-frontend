import styled from 'styled-components';

import { gutter } from 'common/styles/layout';
import { resetList } from 'common/styles/utils';

export const LegendList = styled.ul`
  ${resetList}
  ${gutter({ type: 'outer' })}
  display: flex;
  flex-direction: column;
  flex: 0 1 200px;
`;

export const LegendListItem = styled.li`
  ${gutter({ position: 'vertical', mod: 0.75 })}
  display: flex;
  font-size: .95rem;
  align-items: center;
`;

export const LegendName = styled.div`
  padding: 0 0.6rem;
  flex: 1;
`;

export const LegendValue = styled.div`
  margin-left: auto;
  margin-right: 0.6rem;
  font-weight: 600;
`;
