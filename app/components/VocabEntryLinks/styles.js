import styled from 'styled-components';

import A from 'base/A';

import { resetList } from 'shared/styles/utils';
import { gutter } from 'shared/styles/layout';

export const Ul = styled.ul`
  ${resetList}
  ${gutter({ position: 'horizontal' })}
  display: flex;
  flex: 1 1 100%;
`;

export const VocabLink = styled(A)`
  ${gutter()}
  display: block;
  font-size: 0.9em;
  margin: 0 .2em;
  text-decoration: underline;
`;
