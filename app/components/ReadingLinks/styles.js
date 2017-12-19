import styled from 'styled-components';

import A from 'base/A';

import { resetList } from 'shared/styles/utils';
import { gutter } from 'shared/styles/layout';

export const Ul = styled.ul`
  ${resetList}
  ${gutter()}
  display: flex;
`;

export const VocabLink = styled(A)`
  ${gutter()}
  display: block;
  font-size: 0.9em;
  text-decoration: underline;
`;
