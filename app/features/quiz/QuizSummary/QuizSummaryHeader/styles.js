import styled from 'styled-components';

import H2 from 'common/components/H2';

export const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  flex: 1 1 auto;
`;

export const Heading = styled(H2)`
  font-weight: 500;
  margin-left: auto;
`;
