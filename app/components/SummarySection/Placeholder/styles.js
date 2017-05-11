import styled from 'styled-components';

import H2 from 'base/H2';

export const Heading = styled(H2)`
  font-weight: normal;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  span:first-child {
    margin-right: .5em;
  }
`;
