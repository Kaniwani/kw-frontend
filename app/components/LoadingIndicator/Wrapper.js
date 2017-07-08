import styled from 'styled-components';

import { gutter } from 'shared/styles/layout';

const Wrapper = styled.div`
  ${gutter({ type: 'outer', prop: 'margin', position: 'vertical' })}
  position: relative;
  width: 10vw;
  height: 10vw;
  margin-left: auto;
  margin-right: auto;
  color: ${({ color }) => color}
`;

export default Wrapper;
