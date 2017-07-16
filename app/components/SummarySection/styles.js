import styled from 'styled-components';

import * as COLORS from 'shared/styles/colors';
import { gutter } from 'shared/styles/layout';

export const Section = styled.section`
  ${gutter({ type: 'outer' })}
`;

export const Title = styled.h2`
  ${gutter({ type: 'inner' })}
  text-transform: capitalize;
  color: ${COLORS.blackLight};
`;
