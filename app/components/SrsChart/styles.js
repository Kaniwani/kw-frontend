import styled from 'styled-components';

import { gutter } from 'shared/styles/layout';
import { resetList } from 'shared/styles/utils';

export const LegendWrapper = styled.div`
  ${gutter({ type: 'outer', position: 'vertical' })}
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;

export const LegendList = styled.ul`
  ${resetList}
  display: flex;
  flex-flow: column wrap;
  align-content: flex-start;
  align-items: flex-start;
  flex: 0 1 auto;
`;

export const LegendListItem = styled.li`
  ${gutter({ position: 'vertical', mod: 0.5 })}
  display: flex;
  font-size: .95rem;
  flex: 0 1 auto;
  min-width: 170px;
  align-items: center;
  align-content: center;
`;

export const LegendName = styled.div`
  margin-left: .4rem;
`;

export const LegendValue = styled.div`
  margin-left: auto;
  margin-right: 1.2rem;
  font-weight: 600;
`;
