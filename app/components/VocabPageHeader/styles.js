import styled from 'styled-components';

import { gutter } from 'shared/styles/layout';
import { delta } from 'shared/styles/typography';

import H1 from 'base/H1';

export const Wrapper = styled.div`
  ${gutter({ type: 'outer', position: 'horizontal' })}
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-content: center;
  align-items: center;
`;

export const Title = H1.extend`
  display: inline-flex;
  vertical-align: middle;
  line-height: 1;
`;

export const Heading = styled.div`
  ${gutter({ type: 'outer', position: 'vertical' })}
  display: flex;
  flex: 3 1 auto;
`;

export const Controls = styled.div`
  ${delta}
  display: flex;
  justify-content: center;
  align-content: center;
  flex: 1 0 300px;
`;
