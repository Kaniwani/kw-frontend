import styled from 'styled-components';

import { resetList } from 'shared/styles/utils';
import { gutter } from 'shared/styles/layout';

export const Li = styled.li`
  display: flex;
  flex-flow: column nowrap;
`;

export const Ul = styled.ul`
  ${resetList}
  width: 100%;
`;

export const ReadingContent = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
`;

export const StrokeLoader = styled.div`
  ${gutter()};
  flex: 0 1 auto;
  align-self: flex-start;
`;
