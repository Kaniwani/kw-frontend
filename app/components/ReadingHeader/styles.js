import styled from 'styled-components';
import { gutter } from 'shared/styles/layout';
import { resetList } from 'shared/styles/utils';

import H3 from 'base/H3';
import A from 'base/A';

export const Wrapper = styled.div`
  ${gutter({ type: 'inner' })}
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  align-content: center;
`;

export const Heading = H3.extend`
  margin: 0;
  opacity: .8;
  text-align: left;
  flex: 0 0 auto;
  line-height: 1;
`;
