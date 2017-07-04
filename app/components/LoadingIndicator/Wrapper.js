import styled from 'styled-components';

import { gutter } from 'shared/styles/layout';

const Wrapper = styled.div`
  ${gutter({ type: 'outer', prop: 'margin', direction: 'vertical' })}
  position: relative;
  width: 2rem;
  height: 2rem;
  margin-left: auto;
  margin-right: auto;
  color: ${({ color }) => color}
`;

export default Wrapper;
