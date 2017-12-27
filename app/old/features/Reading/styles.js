import styled from 'styled-components';
import P from 'common/components/P';

import { gutter } from 'common/styles/layout';
import { fluidType } from 'common/styles/utils';
import { delta } from 'common/styles/typography';

export const Wrapper = styled.div`
  ${gutter()} display: flex;
  flex-flow: column nowrap;
  padding-bottom: 0 !important; /* character always has huge space at bottom */
`;

export const Character = P.extend`
  ${fluidType(35, 50)} line-height: 1.2;
`;

export const Kana = P.extend`
  ${delta} align-self: center;
  opacity: 0.8;
  line-height: 1;
`;
