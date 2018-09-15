import styled from 'styled-components';

import H3 from 'common/components/H3';
import P from 'common/components/P';
import { gutter } from 'common/styles/layout';

export const PrimaryMeaning = styled(H3)`
  ${gutter()}
`;

export const SecondaryMeanings = styled(P)`
  ${gutter({ position: 'horizontal' })}
  padding-top: 0 !important;
  margin: 0;
  font-style: italic;
`;
