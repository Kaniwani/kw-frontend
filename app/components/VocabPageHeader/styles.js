import styled from 'styled-components';

import { gutter } from 'shared/styles/layout';
import { delta } from 'shared/styles/typography';

import H1 from 'base/H1';

export const Wrapper = styled.div`
  ${gutter({ type: 'outer', position: 'horizontal' })}
  display: flex;
  flex-flow: row wrap;
  align-content: center;
  align-items: center;
  /* // uncomment when search reintroduced
  justify-content: space-between;
  */
`;

export const Title = H1.extend`
  display: inline-flex;
  vertical-align: middle;
  line-height: 1;
`;

export const Heading = styled.div`
  ${gutter({ type: 'outer', position: 'vertical' })}
  display: flex;
  /* // uncomment when search reintroduced
  flex: 3 1 auto;
  */
`;

export const Controls = styled.div`
  ${delta}
  display: flex;
  margin-left: 1rem;
  /* // uncomment when search reintroduced
  justify-content: center;
  align-content: center;
  flex: 1 0 300px;
  */
`;
