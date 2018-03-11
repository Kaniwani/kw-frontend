import styled from 'styled-components';

import A from 'common/components/A';

import { gutter } from 'common/styles/layout';

export const Li = styled.li`
  display: inline-flex;
  max-width: 100%;
  vertical-align: middle;
  align-items: center;
`;

export const VocabLink = styled(A)`
  ${gutter({ position: 'vertical' })}
  ${gutter({ position: 'horizontal', mod: 1.5 })}
  display: block;
  font-size: 0.9em;
  text-decoration: underline;
`;
