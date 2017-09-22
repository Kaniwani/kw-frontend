import styled from 'styled-components';

import * as COLORS from 'shared/styles/colors';
import { gutter } from 'shared/styles/layout';

import H3 from 'base/H3';

export const Section = styled.section`
  ${gutter({ type: 'inner', position: 'vertical' })}
  ${gutter({ type: 'outer', position: 'horizontal' })}
`;

export const Title = H3.extend`
  ${gutter({ type: 'outer', position: 'horizontal' })}
  text-transform: capitalize;
  color: ${COLORS.blackLight};
`;
