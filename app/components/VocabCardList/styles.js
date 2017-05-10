import styled from 'styled-components';

import { resetList } from 'shared/styles/utils';

export const Ul = styled.ul`
  ${resetList}
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: stretch;
  align-content: center;
`;
