import styled from 'styled-components';

import A from 'common/components/A';

import { resetList } from 'common/styles/utils';
import { gutter } from 'common/styles/layout';

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
